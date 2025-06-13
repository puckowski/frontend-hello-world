/* esm.sh - esbuild bundle(rxjs@7.8.1) es2022 development */
// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isFunction.js
function isFunction(value) {
  return typeof value === "function";
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
  const _super = (instance) => {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  const ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/UnsubscriptionError.js
var UnsubscriptionError = createErrorClass((_super) => function UnsubscriptionErrorImpl(errors) {
  _super(this);
  this.message = errors ? `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join("\n  ")}` : "";
  this.name = "UnsubscriptionError";
  this.errors = errors;
});

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/arrRemove.js
function arrRemove(arr, item) {
  if (arr) {
    const index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/Subscription.js
var Subscription = class _Subscription {
  constructor(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  unsubscribe() {
    let errors;
    if (!this.closed) {
      this.closed = true;
      const { _parentage } = this;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          for (const parent of _parentage) {
            parent.remove(this);
          }
        } else {
          _parentage.remove(this);
        }
      }
      const { initialTeardown: initialFinalizer } = this;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      const { _finalizers } = this;
      if (_finalizers) {
        this._finalizers = null;
        for (const finalizer of _finalizers) {
          try {
            execFinalizer(finalizer);
          } catch (err) {
            errors = errors !== null && errors !== void 0 ? errors : [];
            if (err instanceof UnsubscriptionError) {
              errors = [...errors, ...err.errors];
            } else {
              errors.push(err);
            }
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  }
  add(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof _Subscription) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  }
  _hasParent(parent) {
    const { _parentage } = this;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  }
  _addParent(parent) {
    const { _parentage } = this;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  }
  _removeParent(parent) {
    const { _parentage } = this;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  }
  remove(teardown) {
    const { _finalizers } = this;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof _Subscription) {
      teardown._removeParent(this);
    }
  }
};
Subscription.EMPTY = (() => {
  const empty2 = new Subscription();
  empty2.closed = true;
  return empty2;
})();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/config.js
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/timeoutProvider.js
var timeoutProvider = {
  setTimeout(handler, timeout2, ...args) {
    const { delegate } = timeoutProvider;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout(handler, timeout2, ...args);
    }
    return setTimeout(handler, timeout2, ...args);
  },
  clearTimeout(handle) {
    const { delegate } = timeoutProvider;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/reportUnhandledError.js
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(() => {
    const { onUnhandledError } = config;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/noop.js
function noop() {
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = (() => createNotification("C", void 0, void 0))();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/errorContext.js
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    const isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      const { errorThrown, error } = context;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/Subscriber.js
var Subscriber = class extends Subscription {
  constructor(destination) {
    super();
    this.isStopped = false;
    if (destination) {
      this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(this);
      }
    } else {
      this.destination = EMPTY_OBSERVER;
    }
  }
  static create(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  }
  next(value) {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  }
  error(err) {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  }
  complete() {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  }
  unsubscribe() {
    if (!this.closed) {
      this.isStopped = true;
      super.unsubscribe();
      this.destination = null;
    }
  }
  _next(value) {
    this.destination.next(value);
  }
  _error(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  }
  _complete() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }
};
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = class {
  constructor(partialObserver) {
    this.partialObserver = partialObserver;
  }
  next(value) {
    const { partialObserver } = this;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  }
  error(err) {
    const { partialObserver } = this;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  }
  complete() {
    const { partialObserver } = this;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  }
};
var SafeSubscriber = class extends Subscriber {
  constructor(observerOrNext, error, complete) {
    super();
    let partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      let context2;
      if (this && config.useDeprecatedNextContext) {
        context2 = Object.create(observerOrNext);
        context2.unsubscribe = () => this.unsubscribe();
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context2),
          error: observerOrNext.error && bind(observerOrNext.error, context2),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context2)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    this.destination = new ConsumerObserver(partialObserver);
  }
};
function handleUnhandledError(error) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
function handleStoppedNotification(notification, subscriber) {
  const { onStoppedNotification } = config;
  onStoppedNotification && timeoutProvider.setTimeout(() => onStoppedNotification(notification, subscriber));
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/symbol/observable.js
var observable = (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/identity.js
function identity(x) {
  return x;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/pipe.js
function pipe(...fns) {
  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce((prev, fn) => fn(prev), input);
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/Observable.js
var Observable = class _Observable {
  constructor(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  lift(operator) {
    const observable2 = new _Observable();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  }
  subscribe(observerOrNext, error, complete) {
    const subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(() => {
      const { operator, source } = this;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? this._subscribe(subscriber) : this._trySubscribe(subscriber));
    });
    return subscriber;
  }
  _trySubscribe(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  }
  forEach(next, promiseCtor) {
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor((resolve, reject) => {
      const subscriber = new SafeSubscriber({
        next: (value) => {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      this.subscribe(subscriber);
    });
  }
  _subscribe(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  }
  [observable]() {
    return this;
  }
  pipe(...operations) {
    return pipeFromArray(operations)(this);
  }
  toPromise(promiseCtor) {
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor((resolve, reject) => {
      let value;
      this.subscribe((x) => value = x, (err) => reject(err), () => resolve(value));
    });
  }
};
Observable.create = (subscribe) => {
  return new Observable(subscribe);
};
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/lift.js
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
  return (source) => {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/OperatorSubscriber.js
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = class extends Subscriber {
  constructor(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    super(destination);
    this.onFinalize = onFinalize;
    this.shouldUnsubscribe = shouldUnsubscribe;
    this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : super._next;
    this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : super._error;
    this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : super._complete;
  }
  unsubscribe() {
    var _a;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      const { closed } = this;
      super.unsubscribe();
      !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
    }
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/refCount.js
function refCount() {
  return operate((source, subscriber) => {
    let connection = null;
    source._refCount++;
    const refCounter = createOperatorSubscriber(subscriber, void 0, void 0, void 0, () => {
      if (!source || source._refCount <= 0 || 0 < --source._refCount) {
        connection = null;
        return;
      }
      const sharedConnection = source._connection;
      const conn = connection;
      connection = null;
      if (sharedConnection && (!conn || sharedConnection === conn)) {
        sharedConnection.unsubscribe();
      }
      subscriber.unsubscribe();
    });
    source.subscribe(refCounter);
    if (!refCounter.closed) {
      connection = source.connect();
    }
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/ConnectableObservable.js
var ConnectableObservable = class extends Observable {
  constructor(source, subjectFactory) {
    super();
    this.source = source;
    this.subjectFactory = subjectFactory;
    this._subject = null;
    this._refCount = 0;
    this._connection = null;
    if (hasLift(source)) {
      this.lift = source.lift;
    }
  }
  _subscribe(subscriber) {
    return this.getSubject().subscribe(subscriber);
  }
  getSubject() {
    const subject = this._subject;
    if (!subject || subject.isStopped) {
      this._subject = this.subjectFactory();
    }
    return this._subject;
  }
  _teardown() {
    this._refCount = 0;
    const { _connection } = this;
    this._subject = this._connection = null;
    _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
  }
  connect() {
    let connection = this._connection;
    if (!connection) {
      connection = this._connection = new Subscription();
      const subject = this.getSubject();
      connection.add(this.source.subscribe(createOperatorSubscriber(subject, void 0, () => {
        this._teardown();
        subject.complete();
      }, (err) => {
        this._teardown();
        subject.error(err);
      }, () => this._teardown())));
      if (connection.closed) {
        this._connection = null;
        connection = Subscription.EMPTY;
      }
    }
    return connection;
  }
  refCount() {
    return refCount()(this);
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/performanceTimestampProvider.js
var performanceTimestampProvider = {
  now() {
    return (performanceTimestampProvider.delegate || performance).now();
  },
  delegate: void 0
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/animationFrameProvider.js
var animationFrameProvider = {
  schedule(callback) {
    let request = requestAnimationFrame;
    let cancel = cancelAnimationFrame;
    const { delegate } = animationFrameProvider;
    if (delegate) {
      request = delegate.requestAnimationFrame;
      cancel = delegate.cancelAnimationFrame;
    }
    const handle = request((timestamp2) => {
      cancel = void 0;
      callback(timestamp2);
    });
    return new Subscription(() => cancel === null || cancel === void 0 ? void 0 : cancel(handle));
  },
  requestAnimationFrame(...args) {
    const { delegate } = animationFrameProvider;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame)(...args);
  },
  cancelAnimationFrame(...args) {
    const { delegate } = animationFrameProvider;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame)(...args);
  },
  delegate: void 0
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/dom/animationFrames.js
function animationFrames(timestampProvider) {
  return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
}
function animationFramesFactory(timestampProvider) {
  return new Observable((subscriber) => {
    const provider = timestampProvider || performanceTimestampProvider;
    const start = provider.now();
    let id = 0;
    const run = () => {
      if (!subscriber.closed) {
        id = animationFrameProvider.requestAnimationFrame((timestamp2) => {
          id = 0;
          const now = provider.now();
          subscriber.next({
            timestamp: timestampProvider ? now : timestamp2,
            elapsed: now - start
          });
          run();
        });
      }
    };
    run();
    return () => {
      if (id) {
        animationFrameProvider.cancelAnimationFrame(id);
      }
    };
  });
}
var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/ObjectUnsubscribedError.js
var ObjectUnsubscribedError = createErrorClass((_super) => function ObjectUnsubscribedErrorImpl() {
  _super(this);
  this.name = "ObjectUnsubscribedError";
  this.message = "object unsubscribed";
});

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/Subject.js
var Subject = class extends Observable {
  constructor() {
    super();
    this.closed = false;
    this.currentObservers = null;
    this.observers = [];
    this.isStopped = false;
    this.hasError = false;
    this.thrownError = null;
  }
  lift(operator) {
    const subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  }
  _throwIfClosed() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  }
  next(value) {
    errorContext(() => {
      this._throwIfClosed();
      if (!this.isStopped) {
        if (!this.currentObservers) {
          this.currentObservers = Array.from(this.observers);
        }
        for (const observer of this.currentObservers) {
          observer.next(value);
        }
      }
    });
  }
  error(err) {
    errorContext(() => {
      this._throwIfClosed();
      if (!this.isStopped) {
        this.hasError = this.isStopped = true;
        this.thrownError = err;
        const { observers } = this;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  }
  complete() {
    errorContext(() => {
      this._throwIfClosed();
      if (!this.isStopped) {
        this.isStopped = true;
        const { observers } = this;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  }
  unsubscribe() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  }
  get observed() {
    var _a;
    return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
  }
  _trySubscribe(subscriber) {
    this._throwIfClosed();
    return super._trySubscribe(subscriber);
  }
  _subscribe(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  }
  _innerSubscribe(subscriber) {
    const { hasError, isStopped, observers } = this;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(() => {
      this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  }
  _checkFinalizedStatuses(subscriber) {
    const { hasError, thrownError, isStopped } = this;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  }
  asObservable() {
    const observable2 = new Observable();
    observable2.source = this;
    return observable2;
  }
};
Subject.create = (destination, source) => {
  return new AnonymousSubject(destination, source);
};
var AnonymousSubject = class extends Subject {
  constructor(destination, source) {
    super();
    this.destination = destination;
    this.source = source;
  }
  next(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  }
  error(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  }
  complete() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
  _subscribe(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/BehaviorSubject.js
var BehaviorSubject = class extends Subject {
  constructor(_value) {
    super();
    this._value = _value;
  }
  get value() {
    return this.getValue();
  }
  _subscribe(subscriber) {
    const subscription = super._subscribe(subscriber);
    !subscription.closed && subscriber.next(this._value);
    return subscription;
  }
  getValue() {
    const { hasError, thrownError, _value } = this;
    if (hasError) {
      throw thrownError;
    }
    this._throwIfClosed();
    return _value;
  }
  next(value) {
    super.next(this._value = value);
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/dateTimestampProvider.js
var dateTimestampProvider = {
  now() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: void 0
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/ReplaySubject.js
var ReplaySubject = class extends Subject {
  constructor(_bufferSize = Infinity, _windowTime = Infinity, _timestampProvider = dateTimestampProvider) {
    super();
    this._bufferSize = _bufferSize;
    this._windowTime = _windowTime;
    this._timestampProvider = _timestampProvider;
    this._buffer = [];
    this._infiniteTimeWindow = true;
    this._infiniteTimeWindow = _windowTime === Infinity;
    this._bufferSize = Math.max(1, _bufferSize);
    this._windowTime = Math.max(1, _windowTime);
  }
  next(value) {
    const { isStopped, _buffer, _infiniteTimeWindow, _timestampProvider, _windowTime } = this;
    if (!isStopped) {
      _buffer.push(value);
      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }
    this._trimBuffer();
    super.next(value);
  }
  _subscribe(subscriber) {
    this._throwIfClosed();
    this._trimBuffer();
    const subscription = this._innerSubscribe(subscriber);
    const { _infiniteTimeWindow, _buffer } = this;
    const copy = _buffer.slice();
    for (let i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i]);
    }
    this._checkFinalizedStatuses(subscriber);
    return subscription;
  }
  _trimBuffer() {
    const { _bufferSize, _timestampProvider, _buffer, _infiniteTimeWindow } = this;
    const adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
    if (!_infiniteTimeWindow) {
      const now = _timestampProvider.now();
      let last3 = 0;
      for (let i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
        last3 = i;
      }
      last3 && _buffer.splice(0, last3 + 1);
    }
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/AsyncSubject.js
var AsyncSubject = class extends Subject {
  constructor() {
    super(...arguments);
    this._value = null;
    this._hasValue = false;
    this._isComplete = false;
  }
  _checkFinalizedStatuses(subscriber) {
    const { hasError, _hasValue, _value, thrownError, isStopped, _isComplete } = this;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped || _isComplete) {
      _hasValue && subscriber.next(_value);
      subscriber.complete();
    }
  }
  next(value) {
    if (!this.isStopped) {
      this._value = value;
      this._hasValue = true;
    }
  }
  complete() {
    const { _hasValue, _value, _isComplete } = this;
    if (!_isComplete) {
      this._isComplete = true;
      _hasValue && super.next(_value);
      super.complete();
    }
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/Action.js
var Action = class extends Subscription {
  constructor(scheduler, work) {
    super();
  }
  schedule(state, delay2 = 0) {
    return this;
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/intervalProvider.js
var intervalProvider = {
  setInterval(handler, timeout2, ...args) {
    const { delegate } = intervalProvider;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
      return delegate.setInterval(handler, timeout2, ...args);
    }
    return setInterval(handler, timeout2, ...args);
  },
  clearInterval(handle) {
    const { delegate } = intervalProvider;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: void 0
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/AsyncAction.js
var AsyncAction = class extends Action {
  constructor(scheduler, work) {
    super(scheduler, work);
    this.scheduler = scheduler;
    this.work = work;
    this.pending = false;
  }
  schedule(state, delay2 = 0) {
    var _a;
    if (this.closed) {
      return this;
    }
    this.state = state;
    const id = this.id;
    const scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay2);
    }
    this.pending = true;
    this.delay = delay2;
    this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay2);
    return this;
  }
  requestAsyncId(scheduler, _id, delay2 = 0) {
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay2);
  }
  recycleAsyncId(_scheduler, id, delay2 = 0) {
    if (delay2 != null && this.delay === delay2 && this.pending === false) {
      return id;
    }
    if (id != null) {
      intervalProvider.clearInterval(id);
    }
    return void 0;
  }
  execute(state, delay2) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    const error = this._execute(state, delay2);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  }
  _execute(state, _delay) {
    let errored = false;
    let errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  }
  unsubscribe() {
    if (!this.closed) {
      const { id, scheduler } = this;
      const { actions } = scheduler;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      super.unsubscribe();
    }
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/Immediate.js
var nextHandle = 1;
var resolved;
var activeHandles = {};
function findAndClearHandle(handle) {
  if (handle in activeHandles) {
    delete activeHandles[handle];
    return true;
  }
  return false;
}
var Immediate = {
  setImmediate(cb) {
    const handle = nextHandle++;
    activeHandles[handle] = true;
    if (!resolved) {
      resolved = Promise.resolve();
    }
    resolved.then(() => findAndClearHandle(handle) && cb());
    return handle;
  },
  clearImmediate(handle) {
    findAndClearHandle(handle);
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/immediateProvider.js
var { setImmediate, clearImmediate } = Immediate;
var immediateProvider = {
  setImmediate(...args) {
    const { delegate } = immediateProvider;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate)(...args);
  },
  clearImmediate(handle) {
    const { delegate } = immediateProvider;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
  },
  delegate: void 0
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/AsapAction.js
var AsapAction = class extends AsyncAction {
  constructor(scheduler, work) {
    super(scheduler, work);
    this.scheduler = scheduler;
    this.work = work;
  }
  requestAsyncId(scheduler, id, delay2 = 0) {
    if (delay2 !== null && delay2 > 0) {
      return super.requestAsyncId(scheduler, id, delay2);
    }
    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = immediateProvider.setImmediate(scheduler.flush.bind(scheduler, void 0)));
  }
  recycleAsyncId(scheduler, id, delay2 = 0) {
    var _a;
    if (delay2 != null ? delay2 > 0 : this.delay > 0) {
      return super.recycleAsyncId(scheduler, id, delay2);
    }
    const { actions } = scheduler;
    if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
      immediateProvider.clearImmediate(id);
      if (scheduler._scheduled === id) {
        scheduler._scheduled = void 0;
      }
    }
    return void 0;
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/Scheduler.js
var Scheduler = class _Scheduler {
  constructor(schedulerActionCtor, now = _Scheduler.now) {
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }
  schedule(work, delay2 = 0, state) {
    return new this.schedulerActionCtor(this, work).schedule(state, delay2);
  }
};
Scheduler.now = dateTimestampProvider.now;

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/AsyncScheduler.js
var AsyncScheduler = class extends Scheduler {
  constructor(SchedulerAction, now = Scheduler.now) {
    super(SchedulerAction, now);
    this.actions = [];
    this._active = false;
  }
  flush(action) {
    const { actions } = this;
    if (this._active) {
      actions.push(action);
      return;
    }
    let error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/AsapScheduler.js
var AsapScheduler = class extends AsyncScheduler {
  flush(action) {
    this._active = true;
    const flushId = this._scheduled;
    this._scheduled = void 0;
    const { actions } = this;
    let error;
    action = action || actions.shift();
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while ((action = actions[0]) && action.id === flushId && actions.shift());
    this._active = false;
    if (error) {
      while ((action = actions[0]) && action.id === flushId && actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/asap.js
var asapScheduler = new AsapScheduler(AsapAction);
var asap = asapScheduler;

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/async.js
var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/QueueAction.js
var QueueAction = class extends AsyncAction {
  constructor(scheduler, work) {
    super(scheduler, work);
    this.scheduler = scheduler;
    this.work = work;
  }
  schedule(state, delay2 = 0) {
    if (delay2 > 0) {
      return super.schedule(state, delay2);
    }
    this.delay = delay2;
    this.state = state;
    this.scheduler.flush(this);
    return this;
  }
  execute(state, delay2) {
    return delay2 > 0 || this.closed ? super.execute(state, delay2) : this._execute(state, delay2);
  }
  requestAsyncId(scheduler, id, delay2 = 0) {
    if (delay2 != null && delay2 > 0 || delay2 == null && this.delay > 0) {
      return super.requestAsyncId(scheduler, id, delay2);
    }
    scheduler.flush(this);
    return 0;
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/QueueScheduler.js
var QueueScheduler = class extends AsyncScheduler {
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/queue.js
var queueScheduler = new QueueScheduler(QueueAction);
var queue = queueScheduler;

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/AnimationFrameAction.js
var AnimationFrameAction = class extends AsyncAction {
  constructor(scheduler, work) {
    super(scheduler, work);
    this.scheduler = scheduler;
    this.work = work;
  }
  requestAsyncId(scheduler, id, delay2 = 0) {
    if (delay2 !== null && delay2 > 0) {
      return super.requestAsyncId(scheduler, id, delay2);
    }
    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider.requestAnimationFrame(() => scheduler.flush(void 0)));
  }
  recycleAsyncId(scheduler, id, delay2 = 0) {
    var _a;
    if (delay2 != null ? delay2 > 0 : this.delay > 0) {
      return super.recycleAsyncId(scheduler, id, delay2);
    }
    const { actions } = scheduler;
    if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
      animationFrameProvider.cancelAnimationFrame(id);
      scheduler._scheduled = void 0;
    }
    return void 0;
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/AnimationFrameScheduler.js
var AnimationFrameScheduler = class extends AsyncScheduler {
  flush(action) {
    this._active = true;
    const flushId = this._scheduled;
    this._scheduled = void 0;
    const { actions } = this;
    let error;
    action = action || actions.shift();
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while ((action = actions[0]) && action.id === flushId && actions.shift());
    this._active = false;
    if (error) {
      while ((action = actions[0]) && action.id === flushId && actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/animationFrame.js
var animationFrameScheduler = new AnimationFrameScheduler(AnimationFrameAction);
var animationFrame = animationFrameScheduler;

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduler/VirtualTimeScheduler.js
var VirtualTimeScheduler = class extends AsyncScheduler {
  constructor(schedulerActionCtor = VirtualAction, maxFrames = Infinity) {
    super(schedulerActionCtor, () => this.frame);
    this.maxFrames = maxFrames;
    this.frame = 0;
    this.index = -1;
  }
  flush() {
    const { actions, maxFrames } = this;
    let error;
    let action;
    while ((action = actions[0]) && action.delay <= maxFrames) {
      actions.shift();
      this.frame = action.delay;
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    }
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  }
};
VirtualTimeScheduler.frameTimeFactor = 10;
var VirtualAction = class _VirtualAction extends AsyncAction {
  constructor(scheduler, work, index = scheduler.index += 1) {
    super(scheduler, work);
    this.scheduler = scheduler;
    this.work = work;
    this.index = index;
    this.active = true;
    this.index = scheduler.index = index;
  }
  schedule(state, delay2 = 0) {
    if (Number.isFinite(delay2)) {
      if (!this.id) {
        return super.schedule(state, delay2);
      }
      this.active = false;
      const action = new _VirtualAction(this.scheduler, this.work);
      this.add(action);
      return action.schedule(state, delay2);
    } else {
      return Subscription.EMPTY;
    }
  }
  requestAsyncId(scheduler, id, delay2 = 0) {
    this.delay = scheduler.frame + delay2;
    const { actions } = scheduler;
    actions.push(this);
    actions.sort(_VirtualAction.sortActions);
    return 1;
  }
  recycleAsyncId(scheduler, id, delay2 = 0) {
    return void 0;
  }
  _execute(state, delay2) {
    if (this.active === true) {
      return super._execute(state, delay2);
    }
  }
  static sortActions(a, b) {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.delay > b.delay) {
      return 1;
    } else {
      return -1;
    }
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/empty.js
var EMPTY = new Observable((subscriber) => subscriber.complete());
function empty(scheduler) {
  return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
  return new Observable((subscriber) => scheduler.schedule(() => subscriber.complete()));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isScheduler.js
function isScheduler(value) {
  return value && isFunction(value.schedule);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/args.js
function last(arr) {
  return arr[arr.length - 1];
}
function popResultSelector(args) {
  return isFunction(last(args)) ? args.pop() : void 0;
}
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}
function popNumber(args, defaultValue) {
  return typeof last(args) === "number" ? args.pop() : defaultValue;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/innerFrom.js
import { __asyncValues, __awaiter } from "./tslib.development.mjs";

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isArrayLike.js
var isArrayLike = (x) => x && typeof x.length === "number" && typeof x !== "function";

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isPromise.js
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isInteropObservable.js
function isInteropObservable(input) {
  return isFunction(input[observable]);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isAsyncIterable.js
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
  return new TypeError(`You provided ${input !== null && typeof input === "object" ? "an invalid object" : `'${input}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/symbol/iterator.js
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isIterable.js
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isReadableStreamLike.js
import { __asyncGenerator, __await } from "./tslib.development.mjs";
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function* readableStreamLikeToAsyncGenerator_1() {
    const reader = readableStream.getReader();
    try {
      while (true) {
        const { value, done } = yield __await(reader.read());
        if (done) {
          return yield __await(void 0);
        }
        yield yield __await(value);
      }
    } finally {
      reader.releaseLock();
    }
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/innerFrom.js
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable((subscriber) => {
    const obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable((subscriber) => {
    for (let i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable((subscriber) => {
    promise.then((value) => {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, (err) => subscriber.error(err)).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable((subscriber) => {
    for (const value of iterable) {
      subscriber.next(value);
      if (subscriber.closed) {
        return;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable((subscriber) => {
    process(asyncIterable, subscriber).catch((err) => subscriber.error(err));
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_1, _a;
  return __awaiter(this, void 0, void 0, function* () {
    try {
      for (asyncIterable_1 = __asyncValues(asyncIterable); asyncIterable_1_1 = yield asyncIterable_1.next(), !asyncIterable_1_1.done; ) {
        const value = asyncIterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))
          yield _a.call(asyncIterable_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    subscriber.complete();
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay2 = 0, repeat2 = false) {
  const scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat2) {
      parentSubscription.add(this.schedule(null, delay2));
    } else {
      this.unsubscribe();
    }
  }, delay2);
  parentSubscription.add(scheduleSubscription);
  if (!repeat2) {
    return scheduleSubscription;
  }
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/observeOn.js
function observeOn(scheduler, delay2 = 0) {
  return operate((source, subscriber) => {
    source.subscribe(createOperatorSubscriber(subscriber, (value) => executeSchedule(subscriber, scheduler, () => subscriber.next(value), delay2), () => executeSchedule(subscriber, scheduler, () => subscriber.complete(), delay2), (err) => executeSchedule(subscriber, scheduler, () => subscriber.error(err), delay2)));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/subscribeOn.js
function subscribeOn(scheduler, delay2 = 0) {
  return operate((source, subscriber) => {
    subscriber.add(scheduler.schedule(() => source.subscribe(subscriber), delay2));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduled/scheduleObservable.js
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduled/schedulePromise.js
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduled/scheduleArray.js
function scheduleArray(input, scheduler) {
  return new Observable((subscriber) => {
    let i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduled/scheduleIterable.js
function scheduleIterable(input, scheduler) {
  return new Observable((subscriber) => {
    let iterator2;
    executeSchedule(subscriber, scheduler, () => {
      iterator2 = input[iterator]();
      executeSchedule(subscriber, scheduler, () => {
        let value;
        let done;
        try {
          ({ value, done } = iterator2.next());
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return () => isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduled/scheduleAsyncIterable.js
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable((subscriber) => {
    executeSchedule(subscriber, scheduler, () => {
      const iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, () => {
        iterator2.next().then((result) => {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduled/scheduleReadableStreamLike.js
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/scheduled/scheduled.js
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/from.js
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/of.js
function of(...args) {
  const scheduler = popScheduler(args);
  return from(args, scheduler);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/throwError.js
function throwError(errorOrErrorFactory, scheduler) {
  const errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : () => errorOrErrorFactory;
  const init = (subscriber) => subscriber.error(errorFactory());
  return new Observable(scheduler ? (subscriber) => scheduler.schedule(init, 0, subscriber) : init);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/Notification.js
var NotificationKind;
(function(NotificationKind2) {
  NotificationKind2["NEXT"] = "N";
  NotificationKind2["ERROR"] = "E";
  NotificationKind2["COMPLETE"] = "C";
})(NotificationKind || (NotificationKind = {}));
var Notification = class _Notification {
  constructor(kind, value, error) {
    this.kind = kind;
    this.value = value;
    this.error = error;
    this.hasValue = kind === "N";
  }
  observe(observer) {
    return observeNotification(this, observer);
  }
  do(nextHandler, errorHandler, completeHandler) {
    const { kind, value, error } = this;
    return kind === "N" ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === "E" ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
  }
  accept(nextOrObserver, error, complete) {
    var _a;
    return isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
  }
  toObservable() {
    const { kind, value, error } = this;
    const result = kind === "N" ? of(value) : kind === "E" ? throwError(() => error) : kind === "C" ? EMPTY : 0;
    if (!result) {
      throw new TypeError(`Unexpected notification kind ${kind}`);
    }
    return result;
  }
  static createNext(value) {
    return new _Notification("N", value);
  }
  static createError(err) {
    return new _Notification("E", void 0, err);
  }
  static createComplete() {
    return _Notification.completeNotification;
  }
};
Notification.completeNotification = new Notification("C");
function observeNotification(notification, observer) {
  var _a, _b, _c;
  const { kind, value, error } = notification;
  if (typeof kind !== "string") {
    throw new TypeError('Invalid notification, missing "kind"');
  }
  kind === "N" ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === "E" ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isObservable.js
function isObservable(obj) {
  return !!obj && (obj instanceof Observable || isFunction(obj.lift) && isFunction(obj.subscribe));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/EmptyError.js
var EmptyError = createErrorClass((_super) => function EmptyErrorImpl() {
  _super(this);
  this.name = "EmptyError";
  this.message = "no elements in sequence";
});

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/lastValueFrom.js
function lastValueFrom(source, config2) {
  const hasConfig = typeof config2 === "object";
  return new Promise((resolve, reject) => {
    let _hasValue = false;
    let _value;
    source.subscribe({
      next: (value) => {
        _value = value;
        _hasValue = true;
      },
      error: reject,
      complete: () => {
        if (_hasValue) {
          resolve(_value);
        } else if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }
    });
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/firstValueFrom.js
function firstValueFrom(source, config2) {
  const hasConfig = typeof config2 === "object";
  return new Promise((resolve, reject) => {
    const subscriber = new SafeSubscriber({
      next: (value) => {
        resolve(value);
        subscriber.unsubscribe();
      },
      error: reject,
      complete: () => {
        if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }
    });
    source.subscribe(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/ArgumentOutOfRangeError.js
var ArgumentOutOfRangeError = createErrorClass((_super) => function ArgumentOutOfRangeErrorImpl() {
  _super(this);
  this.name = "ArgumentOutOfRangeError";
  this.message = "argument out of range";
});

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/NotFoundError.js
var NotFoundError = createErrorClass((_super) => function NotFoundErrorImpl(message) {
  _super(this);
  this.name = "NotFoundError";
  this.message = message;
});

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/SequenceError.js
var SequenceError = createErrorClass((_super) => function SequenceErrorImpl(message) {
  _super(this);
  this.name = "SequenceError";
  this.message = message;
});

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/isDate.js
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/timeout.js
var TimeoutError = createErrorClass((_super) => function TimeoutErrorImpl(info = null) {
  _super(this);
  this.message = "Timeout has occurred";
  this.name = "TimeoutError";
  this.info = info;
});
function timeout(config2, schedulerArg) {
  const { first: first2, each, with: _with = timeoutErrorFactory, scheduler = schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : asyncScheduler, meta = null } = isValidDate(config2) ? { first: config2 } : typeof config2 === "number" ? { each: config2 } : config2;
  if (first2 == null && each == null) {
    throw new TypeError("No timeout provided.");
  }
  return operate((source, subscriber) => {
    let originalSourceSubscription;
    let timerSubscription;
    let lastValue = null;
    let seen = 0;
    const startTimer = (delay2) => {
      timerSubscription = executeSchedule(subscriber, scheduler, () => {
        try {
          originalSourceSubscription.unsubscribe();
          innerFrom(_with({
            meta,
            lastValue,
            seen
          })).subscribe(subscriber);
        } catch (err) {
          subscriber.error(err);
        }
      }, delay2);
    };
    originalSourceSubscription = source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
      seen++;
      subscriber.next(lastValue = value);
      each > 0 && startTimer(each);
    }, void 0, void 0, () => {
      if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
        timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
      }
      lastValue = null;
    }));
    !seen && startTimer(first2 != null ? typeof first2 === "number" ? first2 : +first2 - scheduler.now() : each);
  });
}
function timeoutErrorFactory(info) {
  throw new TimeoutError(info);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/map.js
function map(project, thisArg) {
  return operate((source, subscriber) => {
    let index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/mapOneOrManyArgs.js
var { isArray } = Array;
function callOrApply(fn, args) {
  return isArray(args) ? fn(...args) : fn(args);
}
function mapOneOrManyArgs(fn) {
  return map((args) => callOrApply(fn, args));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/bindCallbackInternals.js
function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
  if (resultSelector) {
    if (isScheduler(resultSelector)) {
      scheduler = resultSelector;
    } else {
      return function(...args) {
        return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler).apply(this, args).pipe(mapOneOrManyArgs(resultSelector));
      };
    }
  }
  if (scheduler) {
    return function(...args) {
      return bindCallbackInternals(isNodeStyle, callbackFunc).apply(this, args).pipe(subscribeOn(scheduler), observeOn(scheduler));
    };
  }
  return function(...args) {
    const subject = new AsyncSubject();
    let uninitialized = true;
    return new Observable((subscriber) => {
      const subs = subject.subscribe(subscriber);
      if (uninitialized) {
        uninitialized = false;
        let isAsync = false;
        let isComplete = false;
        callbackFunc.apply(this, [
          ...args,
          (...results) => {
            if (isNodeStyle) {
              const err = results.shift();
              if (err != null) {
                subject.error(err);
                return;
              }
            }
            subject.next(1 < results.length ? results : results[0]);
            isComplete = true;
            if (isAsync) {
              subject.complete();
            }
          }
        ]);
        if (isComplete) {
          subject.complete();
        }
        isAsync = true;
      }
      return subs;
    });
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/bindCallback.js
function bindCallback(callbackFunc, resultSelector, scheduler) {
  return bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/bindNodeCallback.js
function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
  return bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/argsArgArrayOrObject.js
var { isArray: isArray2 } = Array;
var { getPrototypeOf, prototype: objectProto, keys: getKeys } = Object;
function argsArgArrayOrObject(args) {
  if (args.length === 1) {
    const first2 = args[0];
    if (isArray2(first2)) {
      return { args: first2, keys: null };
    }
    if (isPOJO(first2)) {
      const keys = getKeys(first2);
      return {
        args: keys.map((key) => first2[key]),
        keys
      };
    }
  }
  return { args, keys: null };
}
function isPOJO(obj) {
  return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/createObject.js
function createObject(keys, values) {
  return keys.reduce((result, key, i) => (result[key] = values[i], result), {});
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/combineLatest.js
function combineLatest(...args) {
  const scheduler = popScheduler(args);
  const resultSelector = popResultSelector(args);
  const { args: observables, keys } = argsArgArrayOrObject(args);
  if (observables.length === 0) {
    return from([], scheduler);
  }
  const result = new Observable(combineLatestInit(observables, scheduler, keys ? (values) => createObject(keys, values) : identity));
  return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}
function combineLatestInit(observables, scheduler, valueTransform = identity) {
  return (subscriber) => {
    maybeSchedule(scheduler, () => {
      const { length } = observables;
      const values = new Array(length);
      let active = length;
      let remainingFirstValues = length;
      for (let i = 0; i < length; i++) {
        maybeSchedule(scheduler, () => {
          const source = from(observables[i], scheduler);
          let hasFirstValue = false;
          source.subscribe(createOperatorSubscriber(subscriber, (value) => {
            values[i] = value;
            if (!hasFirstValue) {
              hasFirstValue = true;
              remainingFirstValues--;
            }
            if (!remainingFirstValues) {
              subscriber.next(valueTransform(values.slice()));
            }
          }, () => {
            if (!--active) {
              subscriber.complete();
            }
          }));
        }, subscriber);
      }
    }, subscriber);
  };
}
function maybeSchedule(scheduler, execute, subscription) {
  if (scheduler) {
    executeSchedule(subscription, scheduler, execute);
  } else {
    execute();
  }
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/mergeInternals.js
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand2, innerSubScheduler, additionalFinalizer) {
  const buffer2 = [];
  let active = 0;
  let index = 0;
  let isComplete = false;
  const checkComplete = () => {
    if (isComplete && !buffer2.length && !active) {
      subscriber.complete();
    }
  };
  const outerNext = (value) => active < concurrent ? doInnerSub(value) : buffer2.push(value);
  const doInnerSub = (value) => {
    expand2 && subscriber.next(value);
    active++;
    let innerComplete = false;
    innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, (innerValue) => {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand2) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, () => {
      innerComplete = true;
    }, void 0, () => {
      if (innerComplete) {
        try {
          active--;
          while (buffer2.length && active < concurrent) {
            const bufferedValue = buffer2.shift();
            if (innerSubScheduler) {
              executeSchedule(subscriber, innerSubScheduler, () => doInnerSub(bufferedValue));
            } else {
              doInnerSub(bufferedValue);
            }
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(createOperatorSubscriber(subscriber, outerNext, () => {
    isComplete = true;
    checkComplete();
  }));
  return () => {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/mergeMap.js
function mergeMap(project, resultSelector, concurrent = Infinity) {
  if (isFunction(resultSelector)) {
    return mergeMap((a, i) => map((b, ii) => resultSelector(a, b, i, ii))(innerFrom(project(a, i))), concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate((source, subscriber) => mergeInternals(source, subscriber, project, concurrent));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/mergeAll.js
function mergeAll(concurrent = Infinity) {
  return mergeMap(identity, concurrent);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/concatAll.js
function concatAll() {
  return mergeAll(1);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/concat.js
function concat(...args) {
  return concatAll()(from(args, popScheduler(args)));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/defer.js
function defer(observableFactory) {
  return new Observable((subscriber) => {
    innerFrom(observableFactory()).subscribe(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/connectable.js
var DEFAULT_CONFIG = {
  connector: () => new Subject(),
  resetOnDisconnect: true
};
function connectable(source, config2 = DEFAULT_CONFIG) {
  let connection = null;
  const { connector, resetOnDisconnect = true } = config2;
  let subject = connector();
  const result = new Observable((subscriber) => {
    return subject.subscribe(subscriber);
  });
  result.connect = () => {
    if (!connection || connection.closed) {
      connection = defer(() => source).subscribe(subject);
      if (resetOnDisconnect) {
        connection.add(() => subject = connector());
      }
    }
    return connection;
  };
  return result;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/forkJoin.js
function forkJoin(...args) {
  const resultSelector = popResultSelector(args);
  const { args: sources, keys } = argsArgArrayOrObject(args);
  const result = new Observable((subscriber) => {
    const { length } = sources;
    if (!length) {
      subscriber.complete();
      return;
    }
    const values = new Array(length);
    let remainingCompletions = length;
    let remainingEmissions = length;
    for (let sourceIndex = 0; sourceIndex < length; sourceIndex++) {
      let hasValue = false;
      innerFrom(sources[sourceIndex]).subscribe(createOperatorSubscriber(subscriber, (value) => {
        if (!hasValue) {
          hasValue = true;
          remainingEmissions--;
        }
        values[sourceIndex] = value;
      }, () => remainingCompletions--, void 0, () => {
        if (!remainingCompletions || !hasValue) {
          if (!remainingEmissions) {
            subscriber.next(keys ? createObject(keys, values) : values);
          }
          subscriber.complete();
        }
      }));
    }
  });
  return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/fromEvent.js
var nodeEventEmitterMethods = ["addListener", "removeListener"];
var eventTargetMethods = ["addEventListener", "removeEventListener"];
var jqueryMethods = ["on", "off"];
function fromEvent(target, eventName, options, resultSelector) {
  if (isFunction(options)) {
    resultSelector = options;
    options = void 0;
  }
  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs(resultSelector));
  }
  const [add, remove] = isEventTarget(target) ? eventTargetMethods.map((methodName) => (handler) => target[methodName](eventName, handler, options)) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [];
  if (!add) {
    if (isArrayLike(target)) {
      return mergeMap((subTarget) => fromEvent(subTarget, eventName, options))(innerFrom(target));
    }
  }
  if (!add) {
    throw new TypeError("Invalid event target");
  }
  return new Observable((subscriber) => {
    const handler = (...args) => subscriber.next(1 < args.length ? args : args[0]);
    add(handler);
    return () => remove(handler);
  });
}
function toCommonHandlerRegistry(target, eventName) {
  return (methodName) => (handler) => target[methodName](eventName, handler);
}
function isNodeStyleEventEmitter(target) {
  return isFunction(target.addListener) && isFunction(target.removeListener);
}
function isJQueryStyleEventEmitter(target) {
  return isFunction(target.on) && isFunction(target.off);
}
function isEventTarget(target) {
  return isFunction(target.addEventListener) && isFunction(target.removeEventListener);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/fromEventPattern.js
function fromEventPattern(addHandler, removeHandler, resultSelector) {
  if (resultSelector) {
    return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs(resultSelector));
  }
  return new Observable((subscriber) => {
    const handler = (...e) => subscriber.next(e.length === 1 ? e[0] : e);
    const retValue = addHandler(handler);
    return isFunction(removeHandler) ? () => removeHandler(handler, retValue) : void 0;
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/generate.js
function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
  let resultSelector;
  let initialState;
  if (arguments.length === 1) {
    ({
      initialState,
      condition,
      iterate,
      resultSelector = identity,
      scheduler
    } = initialStateOrOptions);
  } else {
    initialState = initialStateOrOptions;
    if (!resultSelectorOrScheduler || isScheduler(resultSelectorOrScheduler)) {
      resultSelector = identity;
      scheduler = resultSelectorOrScheduler;
    } else {
      resultSelector = resultSelectorOrScheduler;
    }
  }
  function* gen() {
    for (let state = initialState; !condition || condition(state); state = iterate(state)) {
      yield resultSelector(state);
    }
  }
  return defer(scheduler ? () => scheduleIterable(gen(), scheduler) : gen);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/iif.js
function iif(condition, trueResult, falseResult) {
  return defer(() => condition() ? trueResult : falseResult);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/timer.js
function timer(dueTime = 0, intervalOrScheduler, scheduler = async) {
  let intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if (isScheduler(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new Observable((subscriber) => {
    let due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    let n = 0;
    return scheduler.schedule(function() {
      if (!subscriber.closed) {
        subscriber.next(n++);
        if (0 <= intervalDuration) {
          this.schedule(void 0, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/interval.js
function interval(period = 0, scheduler = asyncScheduler) {
  if (period < 0) {
    period = 0;
  }
  return timer(period, period, scheduler);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/merge.js
function merge(...args) {
  const scheduler = popScheduler(args);
  const concurrent = popNumber(args, Infinity);
  const sources = args;
  return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/never.js
var NEVER = new Observable(noop);
function never() {
  return NEVER;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/argsOrArgArray.js
var { isArray: isArray3 } = Array;
function argsOrArgArray(args) {
  return args.length === 1 && isArray3(args[0]) ? args[0] : args;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/onErrorResumeNext.js
function onErrorResumeNext(...sources) {
  const nextSources = argsOrArgArray(sources);
  return new Observable((subscriber) => {
    let sourceIndex = 0;
    const subscribeNext = () => {
      if (sourceIndex < nextSources.length) {
        let nextSource;
        try {
          nextSource = innerFrom(nextSources[sourceIndex++]);
        } catch (err) {
          subscribeNext();
          return;
        }
        const innerSubscriber = new OperatorSubscriber(subscriber, void 0, noop, noop);
        nextSource.subscribe(innerSubscriber);
        innerSubscriber.add(subscribeNext);
      } else {
        subscriber.complete();
      }
    };
    subscribeNext();
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/pairs.js
function pairs(obj, scheduler) {
  return from(Object.entries(obj), scheduler);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/util/not.js
function not(pred, thisArg) {
  return (value, index) => !pred.call(thisArg, value, index);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/filter.js
function filter(predicate, thisArg) {
  return operate((source, subscriber) => {
    let index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => predicate.call(thisArg, value, index++) && subscriber.next(value)));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/partition.js
function partition(source, predicate, thisArg) {
  return [filter(predicate, thisArg)(innerFrom(source)), filter(not(predicate, thisArg))(innerFrom(source))];
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/race.js
function race(...sources) {
  sources = argsOrArgArray(sources);
  return sources.length === 1 ? innerFrom(sources[0]) : new Observable(raceInit(sources));
}
function raceInit(sources) {
  return (subscriber) => {
    let subscriptions = [];
    for (let i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
      subscriptions.push(innerFrom(sources[i]).subscribe(createOperatorSubscriber(subscriber, (value) => {
        if (subscriptions) {
          for (let s = 0; s < subscriptions.length; s++) {
            s !== i && subscriptions[s].unsubscribe();
          }
          subscriptions = null;
        }
        subscriber.next(value);
      })));
    }
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/range.js
function range(start, count2, scheduler) {
  if (count2 == null) {
    count2 = start;
    start = 0;
  }
  if (count2 <= 0) {
    return EMPTY;
  }
  const end = count2 + start;
  return new Observable(scheduler ? (subscriber) => {
    let n = start;
    return scheduler.schedule(function() {
      if (n < end) {
        subscriber.next(n++);
        this.schedule();
      } else {
        subscriber.complete();
      }
    });
  } : (subscriber) => {
    let n = start;
    while (n < end && !subscriber.closed) {
      subscriber.next(n++);
    }
    subscriber.complete();
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/using.js
function using(resourceFactory, observableFactory) {
  return new Observable((subscriber) => {
    const resource = resourceFactory();
    const result = observableFactory(resource);
    const source = result ? innerFrom(result) : EMPTY;
    source.subscribe(subscriber);
    return () => {
      if (resource) {
        resource.unsubscribe();
      }
    };
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/zip.js
function zip(...args) {
  const resultSelector = popResultSelector(args);
  const sources = argsOrArgArray(args);
  return sources.length ? new Observable((subscriber) => {
    let buffers = sources.map(() => []);
    let completed = sources.map(() => false);
    subscriber.add(() => {
      buffers = completed = null;
    });
    for (let sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
      innerFrom(sources[sourceIndex]).subscribe(createOperatorSubscriber(subscriber, (value) => {
        buffers[sourceIndex].push(value);
        if (buffers.every((buffer2) => buffer2.length)) {
          const result = buffers.map((buffer2) => buffer2.shift());
          subscriber.next(resultSelector ? resultSelector(...result) : result);
          if (buffers.some((buffer2, i) => !buffer2.length && completed[i])) {
            subscriber.complete();
          }
        }
      }, () => {
        completed[sourceIndex] = true;
        !buffers[sourceIndex].length && subscriber.complete();
      }));
    }
    return () => {
      buffers = completed = null;
    };
  }) : EMPTY;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/audit.js
function audit(durationSelector) {
  return operate((source, subscriber) => {
    let hasValue = false;
    let lastValue = null;
    let durationSubscriber = null;
    let isComplete = false;
    const endDuration = () => {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      durationSubscriber = null;
      if (hasValue) {
        hasValue = false;
        const value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
      isComplete && subscriber.complete();
    };
    const cleanupDuration = () => {
      durationSubscriber = null;
      isComplete && subscriber.complete();
    };
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      hasValue = true;
      lastValue = value;
      if (!durationSubscriber) {
        innerFrom(durationSelector(value)).subscribe(durationSubscriber = createOperatorSubscriber(subscriber, endDuration, cleanupDuration));
      }
    }, () => {
      isComplete = true;
      (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/auditTime.js
function auditTime(duration, scheduler = asyncScheduler) {
  return audit(() => timer(duration, scheduler));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/buffer.js
function buffer(closingNotifier) {
  return operate((source, subscriber) => {
    let currentBuffer = [];
    source.subscribe(createOperatorSubscriber(subscriber, (value) => currentBuffer.push(value), () => {
      subscriber.next(currentBuffer);
      subscriber.complete();
    }));
    innerFrom(closingNotifier).subscribe(createOperatorSubscriber(subscriber, () => {
      const b = currentBuffer;
      currentBuffer = [];
      subscriber.next(b);
    }, noop));
    return () => {
      currentBuffer = null;
    };
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/bufferCount.js
function bufferCount(bufferSize, startBufferEvery = null) {
  startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
  return operate((source, subscriber) => {
    let buffers = [];
    let count2 = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      let toEmit = null;
      if (count2++ % startBufferEvery === 0) {
        buffers.push([]);
      }
      for (const buffer2 of buffers) {
        buffer2.push(value);
        if (bufferSize <= buffer2.length) {
          toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
          toEmit.push(buffer2);
        }
      }
      if (toEmit) {
        for (const buffer2 of toEmit) {
          arrRemove(buffers, buffer2);
          subscriber.next(buffer2);
        }
      }
    }, () => {
      for (const buffer2 of buffers) {
        subscriber.next(buffer2);
      }
      subscriber.complete();
    }, void 0, () => {
      buffers = null;
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/bufferTime.js
function bufferTime(bufferTimeSpan, ...otherArgs) {
  var _a, _b;
  const scheduler = (_a = popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : asyncScheduler;
  const bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
  const maxBufferSize = otherArgs[1] || Infinity;
  return operate((source, subscriber) => {
    let bufferRecords = [];
    let restartOnEmit = false;
    const emit = (record) => {
      const { buffer: buffer2, subs } = record;
      subs.unsubscribe();
      arrRemove(bufferRecords, record);
      subscriber.next(buffer2);
      restartOnEmit && startBuffer();
    };
    const startBuffer = () => {
      if (bufferRecords) {
        const subs = new Subscription();
        subscriber.add(subs);
        const buffer2 = [];
        const record = {
          buffer: buffer2,
          subs
        };
        bufferRecords.push(record);
        executeSchedule(subs, scheduler, () => emit(record), bufferTimeSpan);
      }
    };
    if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
      executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
    } else {
      restartOnEmit = true;
    }
    startBuffer();
    const bufferTimeSubscriber = createOperatorSubscriber(subscriber, (value) => {
      const recordsCopy = bufferRecords.slice();
      for (const record of recordsCopy) {
        const { buffer: buffer2 } = record;
        buffer2.push(value);
        maxBufferSize <= buffer2.length && emit(record);
      }
    }, () => {
      while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
        subscriber.next(bufferRecords.shift().buffer);
      }
      bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
      subscriber.complete();
      subscriber.unsubscribe();
    }, void 0, () => bufferRecords = null);
    source.subscribe(bufferTimeSubscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/bufferToggle.js
function bufferToggle(openings, closingSelector) {
  return operate((source, subscriber) => {
    const buffers = [];
    innerFrom(openings).subscribe(createOperatorSubscriber(subscriber, (openValue) => {
      const buffer2 = [];
      buffers.push(buffer2);
      const closingSubscription = new Subscription();
      const emitBuffer = () => {
        arrRemove(buffers, buffer2);
        subscriber.next(buffer2);
        closingSubscription.unsubscribe();
      };
      closingSubscription.add(innerFrom(closingSelector(openValue)).subscribe(createOperatorSubscriber(subscriber, emitBuffer, noop)));
    }, noop));
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      for (const buffer2 of buffers) {
        buffer2.push(value);
      }
    }, () => {
      while (buffers.length > 0) {
        subscriber.next(buffers.shift());
      }
      subscriber.complete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/bufferWhen.js
function bufferWhen(closingSelector) {
  return operate((source, subscriber) => {
    let buffer2 = null;
    let closingSubscriber = null;
    const openBuffer = () => {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      const b = buffer2;
      buffer2 = [];
      b && subscriber.next(b);
      innerFrom(closingSelector()).subscribe(closingSubscriber = createOperatorSubscriber(subscriber, openBuffer, noop));
    };
    openBuffer();
    source.subscribe(createOperatorSubscriber(subscriber, (value) => buffer2 === null || buffer2 === void 0 ? void 0 : buffer2.push(value), () => {
      buffer2 && subscriber.next(buffer2);
      subscriber.complete();
    }, void 0, () => buffer2 = closingSubscriber = null));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/catchError.js
function catchError(selector) {
  return operate((source, subscriber) => {
    let innerSub = null;
    let syncUnsub = false;
    let handledResult;
    innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, (err) => {
      handledResult = innerFrom(selector(err, catchError(selector)(source)));
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));
    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/scanInternals.js
function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
  return (source, subscriber) => {
    let hasState = hasSeed;
    let state = seed;
    let index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      const i = index++;
      state = hasState ? accumulator(state, value, i) : (hasState = true, value);
      emitOnNext && subscriber.next(state);
    }, emitBeforeComplete && (() => {
      hasState && subscriber.next(state);
      subscriber.complete();
    })));
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/reduce.js
function reduce(accumulator, seed) {
  return operate(scanInternals(accumulator, seed, arguments.length >= 2, false, true));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/toArray.js
var arrReducer = (arr, value) => (arr.push(value), arr);
function toArray() {
  return operate((source, subscriber) => {
    reduce(arrReducer, [])(source).subscribe(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/joinAllInternals.js
function joinAllInternals(joinFn, project) {
  return pipe(toArray(), mergeMap((sources) => joinFn(sources)), project ? mapOneOrManyArgs(project) : identity);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/combineLatestAll.js
function combineLatestAll(project) {
  return joinAllInternals(combineLatest, project);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/combineAll.js
var combineAll = combineLatestAll;

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/combineLatest.js
function combineLatest2(...args) {
  const resultSelector = popResultSelector(args);
  return resultSelector ? pipe(combineLatest2(...args), mapOneOrManyArgs(resultSelector)) : operate((source, subscriber) => {
    combineLatestInit([source, ...argsOrArgArray(args)])(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/combineLatestWith.js
function combineLatestWith(...otherSources) {
  return combineLatest2(...otherSources);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/concatMap.js
function concatMap(project, resultSelector) {
  return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/concatMapTo.js
function concatMapTo(innerObservable, resultSelector) {
  return isFunction(resultSelector) ? concatMap(() => innerObservable, resultSelector) : concatMap(() => innerObservable);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/concat.js
function concat2(...args) {
  const scheduler = popScheduler(args);
  return operate((source, subscriber) => {
    concatAll()(from([source, ...args], scheduler)).subscribe(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/concatWith.js
function concatWith(...otherSources) {
  return concat2(...otherSources);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/observable/fromSubscribable.js
function fromSubscribable(subscribable) {
  return new Observable((subscriber) => subscribable.subscribe(subscriber));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/connect.js
var DEFAULT_CONFIG2 = {
  connector: () => new Subject()
};
function connect(selector, config2 = DEFAULT_CONFIG2) {
  const { connector } = config2;
  return operate((source, subscriber) => {
    const subject = connector();
    innerFrom(selector(fromSubscribable(subject))).subscribe(subscriber);
    subscriber.add(source.subscribe(subject));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/count.js
function count(predicate) {
  return reduce((total, value, i) => !predicate || predicate(value, i) ? total + 1 : total, 0);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/debounce.js
function debounce(durationSelector) {
  return operate((source, subscriber) => {
    let hasValue = false;
    let lastValue = null;
    let durationSubscriber = null;
    const emit = () => {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      durationSubscriber = null;
      if (hasValue) {
        hasValue = false;
        const value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      hasValue = true;
      lastValue = value;
      durationSubscriber = createOperatorSubscriber(subscriber, emit, noop);
      innerFrom(durationSelector(value)).subscribe(durationSubscriber);
    }, () => {
      emit();
      subscriber.complete();
    }, void 0, () => {
      lastValue = durationSubscriber = null;
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/debounceTime.js
function debounceTime(dueTime, scheduler = asyncScheduler) {
  return operate((source, subscriber) => {
    let activeTask = null;
    let lastValue = null;
    let lastTime = null;
    const emit = () => {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        const value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    function emitWhenIdle() {
      const targetTime = lastTime + dueTime;
      const now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(void 0, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, () => {
      emit();
      subscriber.complete();
    }, void 0, () => {
      lastValue = activeTask = null;
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/defaultIfEmpty.js
function defaultIfEmpty(defaultValue) {
  return operate((source, subscriber) => {
    let hasValue = false;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      hasValue = true;
      subscriber.next(value);
    }, () => {
      if (!hasValue) {
        subscriber.next(defaultValue);
      }
      subscriber.complete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/take.js
function take(count2) {
  return count2 <= 0 ? () => EMPTY : operate((source, subscriber) => {
    let seen = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      if (++seen <= count2) {
        subscriber.next(value);
        if (count2 <= seen) {
          subscriber.complete();
        }
      }
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/ignoreElements.js
function ignoreElements() {
  return operate((source, subscriber) => {
    source.subscribe(createOperatorSubscriber(subscriber, noop));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/mapTo.js
function mapTo(value) {
  return map(() => value);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/delayWhen.js
function delayWhen(delayDurationSelector, subscriptionDelay) {
  if (subscriptionDelay) {
    return (source) => concat(subscriptionDelay.pipe(take(1), ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
  }
  return mergeMap((value, index) => innerFrom(delayDurationSelector(value, index)).pipe(take(1), mapTo(value)));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/delay.js
function delay(due, scheduler = asyncScheduler) {
  const duration = timer(due, scheduler);
  return delayWhen(() => duration);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/dematerialize.js
function dematerialize() {
  return operate((source, subscriber) => {
    source.subscribe(createOperatorSubscriber(subscriber, (notification) => observeNotification(notification, subscriber)));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/distinct.js
function distinct(keySelector, flushes) {
  return operate((source, subscriber) => {
    const distinctKeys = /* @__PURE__ */ new Set();
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      const key = keySelector ? keySelector(value) : value;
      if (!distinctKeys.has(key)) {
        distinctKeys.add(key);
        subscriber.next(value);
      }
    }));
    flushes && innerFrom(flushes).subscribe(createOperatorSubscriber(subscriber, () => distinctKeys.clear(), noop));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/distinctUntilChanged.js
function distinctUntilChanged(comparator, keySelector = identity) {
  comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
  return operate((source, subscriber) => {
    let previousKey;
    let first2 = true;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      const currentKey = keySelector(value);
      if (first2 || !comparator(previousKey, currentKey)) {
        first2 = false;
        previousKey = currentKey;
        subscriber.next(value);
      }
    }));
  });
}
function defaultCompare(a, b) {
  return a === b;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/distinctUntilKeyChanged.js
function distinctUntilKeyChanged(key, compare) {
  return distinctUntilChanged((x, y) => compare ? compare(x[key], y[key]) : x[key] === y[key]);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/throwIfEmpty.js
function throwIfEmpty(errorFactory = defaultErrorFactory) {
  return operate((source, subscriber) => {
    let hasValue = false;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      hasValue = true;
      subscriber.next(value);
    }, () => hasValue ? subscriber.complete() : subscriber.error(errorFactory())));
  });
}
function defaultErrorFactory() {
  return new EmptyError();
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/elementAt.js
function elementAt(index, defaultValue) {
  if (index < 0) {
    throw new ArgumentOutOfRangeError();
  }
  const hasDefaultValue = arguments.length >= 2;
  return (source) => source.pipe(filter((v, i) => i === index), take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(() => new ArgumentOutOfRangeError()));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/endWith.js
function endWith(...values) {
  return (source) => concat(source, of(...values));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/every.js
function every(predicate, thisArg) {
  return operate((source, subscriber) => {
    let index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      if (!predicate.call(thisArg, value, index++, source)) {
        subscriber.next(false);
        subscriber.complete();
      }
    }, () => {
      subscriber.next(true);
      subscriber.complete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/exhaustMap.js
function exhaustMap(project, resultSelector) {
  if (resultSelector) {
    return (source) => source.pipe(exhaustMap((a, i) => innerFrom(project(a, i)).pipe(map((b, ii) => resultSelector(a, b, i, ii)))));
  }
  return operate((source, subscriber) => {
    let index = 0;
    let innerSub = null;
    let isComplete = false;
    source.subscribe(createOperatorSubscriber(subscriber, (outerValue) => {
      if (!innerSub) {
        innerSub = createOperatorSubscriber(subscriber, void 0, () => {
          innerSub = null;
          isComplete && subscriber.complete();
        });
        innerFrom(project(outerValue, index++)).subscribe(innerSub);
      }
    }, () => {
      isComplete = true;
      !innerSub && subscriber.complete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/exhaustAll.js
function exhaustAll() {
  return exhaustMap(identity);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/exhaust.js
var exhaust = exhaustAll;

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/expand.js
function expand(project, concurrent = Infinity, scheduler) {
  concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
  return operate((source, subscriber) => mergeInternals(source, subscriber, project, concurrent, void 0, true, scheduler));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/finalize.js
function finalize(callback) {
  return operate((source, subscriber) => {
    try {
      source.subscribe(subscriber);
    } finally {
      subscriber.add(callback);
    }
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/find.js
function find(predicate, thisArg) {
  return operate(createFind(predicate, thisArg, "value"));
}
function createFind(predicate, thisArg, emit) {
  const findIndex2 = emit === "index";
  return (source, subscriber) => {
    let index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      const i = index++;
      if (predicate.call(thisArg, value, i, source)) {
        subscriber.next(findIndex2 ? i : value);
        subscriber.complete();
      }
    }, () => {
      subscriber.next(findIndex2 ? -1 : void 0);
      subscriber.complete();
    }));
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/findIndex.js
function findIndex(predicate, thisArg) {
  return operate(createFind(predicate, thisArg, "index"));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/first.js
function first(predicate, defaultValue) {
  const hasDefaultValue = arguments.length >= 2;
  return (source) => source.pipe(predicate ? filter((v, i) => predicate(v, i, source)) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(() => new EmptyError()));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/groupBy.js
function groupBy(keySelector, elementOrOptions, duration, connector) {
  return operate((source, subscriber) => {
    let element;
    if (!elementOrOptions || typeof elementOrOptions === "function") {
      element = elementOrOptions;
    } else {
      ({ duration, element, connector } = elementOrOptions);
    }
    const groups = /* @__PURE__ */ new Map();
    const notify = (cb) => {
      groups.forEach(cb);
      cb(subscriber);
    };
    const handleError = (err) => notify((consumer) => consumer.error(err));
    let activeGroups = 0;
    let teardownAttempted = false;
    const groupBySourceSubscriber = new OperatorSubscriber(subscriber, (value) => {
      try {
        const key = keySelector(value);
        let group = groups.get(key);
        if (!group) {
          groups.set(key, group = connector ? connector() : new Subject());
          const grouped = createGroupedObservable(key, group);
          subscriber.next(grouped);
          if (duration) {
            const durationSubscriber = createOperatorSubscriber(group, () => {
              group.complete();
              durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
            }, void 0, void 0, () => groups.delete(key));
            groupBySourceSubscriber.add(innerFrom(duration(grouped)).subscribe(durationSubscriber));
          }
        }
        group.next(element ? element(value) : value);
      } catch (err) {
        handleError(err);
      }
    }, () => notify((consumer) => consumer.complete()), handleError, () => groups.clear(), () => {
      teardownAttempted = true;
      return activeGroups === 0;
    });
    source.subscribe(groupBySourceSubscriber);
    function createGroupedObservable(key, groupSubject) {
      const result = new Observable((groupSubscriber) => {
        activeGroups++;
        const innerSub = groupSubject.subscribe(groupSubscriber);
        return () => {
          innerSub.unsubscribe();
          --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
        };
      });
      result.key = key;
      return result;
    }
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/isEmpty.js
function isEmpty() {
  return operate((source, subscriber) => {
    source.subscribe(createOperatorSubscriber(subscriber, () => {
      subscriber.next(false);
      subscriber.complete();
    }, () => {
      subscriber.next(true);
      subscriber.complete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/takeLast.js
function takeLast(count2) {
  return count2 <= 0 ? () => EMPTY : operate((source, subscriber) => {
    let buffer2 = [];
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      buffer2.push(value);
      count2 < buffer2.length && buffer2.shift();
    }, () => {
      for (const value of buffer2) {
        subscriber.next(value);
      }
      subscriber.complete();
    }, void 0, () => {
      buffer2 = null;
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/last.js
function last2(predicate, defaultValue) {
  const hasDefaultValue = arguments.length >= 2;
  return (source) => source.pipe(predicate ? filter((v, i) => predicate(v, i, source)) : identity, takeLast(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(() => new EmptyError()));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/materialize.js
function materialize() {
  return operate((source, subscriber) => {
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      subscriber.next(Notification.createNext(value));
    }, () => {
      subscriber.next(Notification.createComplete());
      subscriber.complete();
    }, (err) => {
      subscriber.next(Notification.createError(err));
      subscriber.complete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/max.js
function max(comparer) {
  return reduce(isFunction(comparer) ? (x, y) => comparer(x, y) > 0 ? x : y : (x, y) => x > y ? x : y);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/flatMap.js
var flatMap = mergeMap;

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/mergeMapTo.js
function mergeMapTo(innerObservable, resultSelector, concurrent = Infinity) {
  if (isFunction(resultSelector)) {
    return mergeMap(() => innerObservable, resultSelector, concurrent);
  }
  if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return mergeMap(() => innerObservable, concurrent);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/mergeScan.js
function mergeScan(accumulator, seed, concurrent = Infinity) {
  return operate((source, subscriber) => {
    let state = seed;
    return mergeInternals(source, subscriber, (value, index) => accumulator(state, value, index), concurrent, (value) => {
      state = value;
    }, false, void 0, () => state = null);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/merge.js
function merge2(...args) {
  const scheduler = popScheduler(args);
  const concurrent = popNumber(args, Infinity);
  args = argsOrArgArray(args);
  return operate((source, subscriber) => {
    mergeAll(concurrent)(from([source, ...args], scheduler)).subscribe(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/mergeWith.js
function mergeWith(...otherSources) {
  return merge2(...otherSources);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/min.js
function min(comparer) {
  return reduce(isFunction(comparer) ? (x, y) => comparer(x, y) < 0 ? x : y : (x, y) => x < y ? x : y);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/multicast.js
function multicast(subjectOrSubjectFactory, selector) {
  const subjectFactory = isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : () => subjectOrSubjectFactory;
  if (isFunction(selector)) {
    return connect(selector, {
      connector: subjectFactory
    });
  }
  return (source) => new ConnectableObservable(source, subjectFactory);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/onErrorResumeNextWith.js
function onErrorResumeNextWith(...sources) {
  const nextSources = argsOrArgArray(sources);
  return (source) => onErrorResumeNext(source, ...nextSources);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/pairwise.js
function pairwise() {
  return operate((source, subscriber) => {
    let prev;
    let hasPrev = false;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      const p = prev;
      prev = value;
      hasPrev && subscriber.next([p, value]);
      hasPrev = true;
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/pluck.js
function pluck(...properties) {
  const length = properties.length;
  if (length === 0) {
    throw new Error("list of properties cannot be empty.");
  }
  return map((x) => {
    let currentProp = x;
    for (let i = 0; i < length; i++) {
      const p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
      if (typeof p !== "undefined") {
        currentProp = p;
      } else {
        return void 0;
      }
    }
    return currentProp;
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/publish.js
function publish(selector) {
  return selector ? (source) => connect(selector)(source) : (source) => multicast(new Subject())(source);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/publishBehavior.js
function publishBehavior(initialValue) {
  return (source) => {
    const subject = new BehaviorSubject(initialValue);
    return new ConnectableObservable(source, () => subject);
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/publishLast.js
function publishLast() {
  return (source) => {
    const subject = new AsyncSubject();
    return new ConnectableObservable(source, () => subject);
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/publishReplay.js
function publishReplay(bufferSize, windowTime2, selectorOrScheduler, timestampProvider) {
  if (selectorOrScheduler && !isFunction(selectorOrScheduler)) {
    timestampProvider = selectorOrScheduler;
  }
  const selector = isFunction(selectorOrScheduler) ? selectorOrScheduler : void 0;
  return (source) => multicast(new ReplaySubject(bufferSize, windowTime2, timestampProvider), selector)(source);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/raceWith.js
function raceWith(...otherSources) {
  return !otherSources.length ? identity : operate((source, subscriber) => {
    raceInit([source, ...otherSources])(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/repeat.js
function repeat(countOrConfig) {
  let count2 = Infinity;
  let delay2;
  if (countOrConfig != null) {
    if (typeof countOrConfig === "object") {
      ({ count: count2 = Infinity, delay: delay2 } = countOrConfig);
    } else {
      count2 = countOrConfig;
    }
  }
  return count2 <= 0 ? () => EMPTY : operate((source, subscriber) => {
    let soFar = 0;
    let sourceSub;
    const resubscribe = () => {
      sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
      sourceSub = null;
      if (delay2 != null) {
        const notifier = typeof delay2 === "number" ? timer(delay2) : innerFrom(delay2(soFar));
        const notifierSubscriber = createOperatorSubscriber(subscriber, () => {
          notifierSubscriber.unsubscribe();
          subscribeToSource();
        });
        notifier.subscribe(notifierSubscriber);
      } else {
        subscribeToSource();
      }
    };
    const subscribeToSource = () => {
      let syncUnsub = false;
      sourceSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, () => {
        if (++soFar < count2) {
          if (sourceSub) {
            resubscribe();
          } else {
            syncUnsub = true;
          }
        } else {
          subscriber.complete();
        }
      }));
      if (syncUnsub) {
        resubscribe();
      }
    };
    subscribeToSource();
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/repeatWhen.js
function repeatWhen(notifier) {
  return operate((source, subscriber) => {
    let innerSub;
    let syncResub = false;
    let completions$;
    let isNotifierComplete = false;
    let isMainComplete = false;
    const checkComplete = () => isMainComplete && isNotifierComplete && (subscriber.complete(), true);
    const getCompletionSubject = () => {
      if (!completions$) {
        completions$ = new Subject();
        innerFrom(notifier(completions$)).subscribe(createOperatorSubscriber(subscriber, () => {
          if (innerSub) {
            subscribeForRepeatWhen();
          } else {
            syncResub = true;
          }
        }, () => {
          isNotifierComplete = true;
          checkComplete();
        }));
      }
      return completions$;
    };
    const subscribeForRepeatWhen = () => {
      isMainComplete = false;
      innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, () => {
        isMainComplete = true;
        !checkComplete() && getCompletionSubject().next();
      }));
      if (syncResub) {
        innerSub.unsubscribe();
        innerSub = null;
        syncResub = false;
        subscribeForRepeatWhen();
      }
    };
    subscribeForRepeatWhen();
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/retry.js
function retry(configOrCount = Infinity) {
  let config2;
  if (configOrCount && typeof configOrCount === "object") {
    config2 = configOrCount;
  } else {
    config2 = {
      count: configOrCount
    };
  }
  const { count: count2 = Infinity, delay: delay2, resetOnSuccess = false } = config2;
  return count2 <= 0 ? identity : operate((source, subscriber) => {
    let soFar = 0;
    let innerSub;
    const subscribeForRetry = () => {
      let syncUnsub = false;
      innerSub = source.subscribe(createOperatorSubscriber(subscriber, (value) => {
        if (resetOnSuccess) {
          soFar = 0;
        }
        subscriber.next(value);
      }, void 0, (err) => {
        if (soFar++ < count2) {
          const resub = () => {
            if (innerSub) {
              innerSub.unsubscribe();
              innerSub = null;
              subscribeForRetry();
            } else {
              syncUnsub = true;
            }
          };
          if (delay2 != null) {
            const notifier = typeof delay2 === "number" ? timer(delay2) : innerFrom(delay2(err, soFar));
            const notifierSubscriber = createOperatorSubscriber(subscriber, () => {
              notifierSubscriber.unsubscribe();
              resub();
            }, () => {
              subscriber.complete();
            });
            notifier.subscribe(notifierSubscriber);
          } else {
            resub();
          }
        } else {
          subscriber.error(err);
        }
      }));
      if (syncUnsub) {
        innerSub.unsubscribe();
        innerSub = null;
        subscribeForRetry();
      }
    };
    subscribeForRetry();
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/retryWhen.js
function retryWhen(notifier) {
  return operate((source, subscriber) => {
    let innerSub;
    let syncResub = false;
    let errors$;
    const subscribeForRetryWhen = () => {
      innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, (err) => {
        if (!errors$) {
          errors$ = new Subject();
          innerFrom(notifier(errors$)).subscribe(createOperatorSubscriber(subscriber, () => innerSub ? subscribeForRetryWhen() : syncResub = true));
        }
        if (errors$) {
          errors$.next(err);
        }
      }));
      if (syncResub) {
        innerSub.unsubscribe();
        innerSub = null;
        syncResub = false;
        subscribeForRetryWhen();
      }
    };
    subscribeForRetryWhen();
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/sample.js
function sample(notifier) {
  return operate((source, subscriber) => {
    let hasValue = false;
    let lastValue = null;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      hasValue = true;
      lastValue = value;
    }));
    innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, () => {
      if (hasValue) {
        hasValue = false;
        const value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    }, noop));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/sampleTime.js
function sampleTime(period, scheduler = asyncScheduler) {
  return sample(interval(period, scheduler));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/scan.js
function scan(accumulator, seed) {
  return operate(scanInternals(accumulator, seed, arguments.length >= 2, true));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/sequenceEqual.js
function sequenceEqual(compareTo, comparator = (a, b) => a === b) {
  return operate((source, subscriber) => {
    const aState = createState();
    const bState = createState();
    const emit = (isEqual) => {
      subscriber.next(isEqual);
      subscriber.complete();
    };
    const createSubscriber = (selfState, otherState) => {
      const sequenceEqualSubscriber = createOperatorSubscriber(subscriber, (a) => {
        const { buffer: buffer2, complete } = otherState;
        if (buffer2.length === 0) {
          complete ? emit(false) : selfState.buffer.push(a);
        } else {
          !comparator(a, buffer2.shift()) && emit(false);
        }
      }, () => {
        selfState.complete = true;
        const { complete, buffer: buffer2 } = otherState;
        complete && emit(buffer2.length === 0);
        sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
      });
      return sequenceEqualSubscriber;
    };
    source.subscribe(createSubscriber(aState, bState));
    innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
  });
}
function createState() {
  return {
    buffer: [],
    complete: false
  };
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/share.js
function share(options = {}) {
  const { connector = () => new Subject(), resetOnError = true, resetOnComplete = true, resetOnRefCountZero = true } = options;
  return (wrapperSource) => {
    let connection;
    let resetConnection;
    let subject;
    let refCount2 = 0;
    let hasCompleted = false;
    let hasErrored = false;
    const cancelReset = () => {
      resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
      resetConnection = void 0;
    };
    const reset = () => {
      cancelReset();
      connection = subject = void 0;
      hasCompleted = hasErrored = false;
    };
    const resetAndUnsubscribe = () => {
      const conn = connection;
      reset();
      conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
    };
    return operate((source, subscriber) => {
      refCount2++;
      if (!hasErrored && !hasCompleted) {
        cancelReset();
      }
      const dest = subject = subject !== null && subject !== void 0 ? subject : connector();
      subscriber.add(() => {
        refCount2--;
        if (refCount2 === 0 && !hasErrored && !hasCompleted) {
          resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
        }
      });
      dest.subscribe(subscriber);
      if (!connection && refCount2 > 0) {
        connection = new SafeSubscriber({
          next: (value) => dest.next(value),
          error: (err) => {
            hasErrored = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnError, err);
            dest.error(err);
          },
          complete: () => {
            hasCompleted = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnComplete);
            dest.complete();
          }
        });
        innerFrom(source).subscribe(connection);
      }
    })(wrapperSource);
  };
}
function handleReset(reset, on, ...args) {
  if (on === true) {
    reset();
    return;
  }
  if (on === false) {
    return;
  }
  const onSubscriber = new SafeSubscriber({
    next: () => {
      onSubscriber.unsubscribe();
      reset();
    }
  });
  return innerFrom(on(...args)).subscribe(onSubscriber);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/shareReplay.js
function shareReplay(configOrBufferSize, windowTime2, scheduler) {
  let bufferSize;
  let refCount2 = false;
  if (configOrBufferSize && typeof configOrBufferSize === "object") {
    ({ bufferSize = Infinity, windowTime: windowTime2 = Infinity, refCount: refCount2 = false, scheduler } = configOrBufferSize);
  } else {
    bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
  }
  return share({
    connector: () => new ReplaySubject(bufferSize, windowTime2, scheduler),
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero: refCount2
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/single.js
function single(predicate) {
  return operate((source, subscriber) => {
    let hasValue = false;
    let singleValue;
    let seenValue = false;
    let index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      seenValue = true;
      if (!predicate || predicate(value, index++, source)) {
        hasValue && subscriber.error(new SequenceError("Too many matching values"));
        hasValue = true;
        singleValue = value;
      }
    }, () => {
      if (hasValue) {
        subscriber.next(singleValue);
        subscriber.complete();
      } else {
        subscriber.error(seenValue ? new NotFoundError("No matching values") : new EmptyError());
      }
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/skip.js
function skip(count2) {
  return filter((_, index) => count2 <= index);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/skipLast.js
function skipLast(skipCount) {
  return skipCount <= 0 ? identity : operate((source, subscriber) => {
    let ring = new Array(skipCount);
    let seen = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      const valueIndex = seen++;
      if (valueIndex < skipCount) {
        ring[valueIndex] = value;
      } else {
        const index = valueIndex % skipCount;
        const oldValue = ring[index];
        ring[index] = value;
        subscriber.next(oldValue);
      }
    }));
    return () => {
      ring = null;
    };
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/skipUntil.js
function skipUntil(notifier) {
  return operate((source, subscriber) => {
    let taking = false;
    const skipSubscriber = createOperatorSubscriber(subscriber, () => {
      skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
      taking = true;
    }, noop);
    innerFrom(notifier).subscribe(skipSubscriber);
    source.subscribe(createOperatorSubscriber(subscriber, (value) => taking && subscriber.next(value)));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/skipWhile.js
function skipWhile(predicate) {
  return operate((source, subscriber) => {
    let taking = false;
    let index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => (taking || (taking = !predicate(value, index++))) && subscriber.next(value)));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/startWith.js
function startWith(...values) {
  const scheduler = popScheduler(values);
  return operate((source, subscriber) => {
    (scheduler ? concat(values, source, scheduler) : concat(values, source)).subscribe(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/switchMap.js
function switchMap(project, resultSelector) {
  return operate((source, subscriber) => {
    let innerSubscriber = null;
    let index = 0;
    let isComplete = false;
    const checkComplete = () => isComplete && !innerSubscriber && subscriber.complete();
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
      let innerIndex = 0;
      const outerIndex = index++;
      innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = createOperatorSubscriber(subscriber, (innerValue) => subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue), () => {
        innerSubscriber = null;
        checkComplete();
      }));
    }, () => {
      isComplete = true;
      checkComplete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/switchAll.js
function switchAll() {
  return switchMap(identity);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/switchMapTo.js
function switchMapTo(innerObservable, resultSelector) {
  return isFunction(resultSelector) ? switchMap(() => innerObservable, resultSelector) : switchMap(() => innerObservable);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/switchScan.js
function switchScan(accumulator, seed) {
  return operate((source, subscriber) => {
    let state = seed;
    switchMap((value, index) => accumulator(state, value, index), (_, innerValue) => (state = innerValue, innerValue))(source).subscribe(subscriber);
    return () => {
      state = null;
    };
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/takeUntil.js
function takeUntil(notifier) {
  return operate((source, subscriber) => {
    innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, () => subscriber.complete(), noop));
    !subscriber.closed && source.subscribe(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/takeWhile.js
function takeWhile(predicate, inclusive = false) {
  return operate((source, subscriber) => {
    let index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      const result = predicate(value, index++);
      (result || inclusive) && subscriber.next(value);
      !result && subscriber.complete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/tap.js
function tap(observerOrNext, error, complete) {
  const tapObserver = isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
  return tapObserver ? operate((source, subscriber) => {
    var _a;
    (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
    let isUnsub = true;
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      var _a2;
      (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
      subscriber.next(value);
    }, () => {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      subscriber.complete();
    }, (err) => {
      var _a2;
      isUnsub = false;
      (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
      subscriber.error(err);
    }, () => {
      var _a2, _b;
      if (isUnsub) {
        (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
      }
      (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
    }));
  }) : identity;
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/throttle.js
function throttle(durationSelector, config2) {
  return operate((source, subscriber) => {
    const { leading = true, trailing = false } = config2 !== null && config2 !== void 0 ? config2 : {};
    let hasValue = false;
    let sendValue = null;
    let throttled = null;
    let isComplete = false;
    const endThrottling = () => {
      throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
      throttled = null;
      if (trailing) {
        send();
        isComplete && subscriber.complete();
      }
    };
    const cleanupThrottling = () => {
      throttled = null;
      isComplete && subscriber.complete();
    };
    const startThrottle = (value) => throttled = innerFrom(durationSelector(value)).subscribe(createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
    const send = () => {
      if (hasValue) {
        hasValue = false;
        const value = sendValue;
        sendValue = null;
        subscriber.next(value);
        !isComplete && startThrottle(value);
      }
    };
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      hasValue = true;
      sendValue = value;
      !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
    }, () => {
      isComplete = true;
      !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/throttleTime.js
function throttleTime(duration, scheduler = asyncScheduler, config2) {
  const duration$ = timer(duration, scheduler);
  return throttle(() => duration$, config2);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/timeInterval.js
function timeInterval(scheduler = asyncScheduler) {
  return operate((source, subscriber) => {
    let last3 = scheduler.now();
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      const now = scheduler.now();
      const interval2 = now - last3;
      last3 = now;
      subscriber.next(new TimeInterval(value, interval2));
    }));
  });
}
var TimeInterval = class {
  constructor(value, interval2) {
    this.value = value;
    this.interval = interval2;
  }
};

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/timeoutWith.js
function timeoutWith(due, withObservable, scheduler) {
  let first2;
  let each;
  let _with;
  scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async;
  if (isValidDate(due)) {
    first2 = due;
  } else if (typeof due === "number") {
    each = due;
  }
  if (withObservable) {
    _with = () => withObservable;
  } else {
    throw new TypeError("No observable provided to switch to");
  }
  if (first2 == null && each == null) {
    throw new TypeError("No timeout provided.");
  }
  return timeout({
    first: first2,
    each,
    scheduler,
    with: _with
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/timestamp.js
function timestamp(timestampProvider = dateTimestampProvider) {
  return map((value) => ({ value, timestamp: timestampProvider.now() }));
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/window.js
function window(windowBoundaries) {
  return operate((source, subscriber) => {
    let windowSubject = new Subject();
    subscriber.next(windowSubject.asObservable());
    const errorHandler = (err) => {
      windowSubject.error(err);
      subscriber.error(err);
    };
    source.subscribe(createOperatorSubscriber(subscriber, (value) => windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value), () => {
      windowSubject.complete();
      subscriber.complete();
    }, errorHandler));
    innerFrom(windowBoundaries).subscribe(createOperatorSubscriber(subscriber, () => {
      windowSubject.complete();
      subscriber.next(windowSubject = new Subject());
    }, noop, errorHandler));
    return () => {
      windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
      windowSubject = null;
    };
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/windowCount.js
function windowCount(windowSize, startWindowEvery = 0) {
  const startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
  return operate((source, subscriber) => {
    let windows = [new Subject()];
    let starts = [];
    let count2 = 0;
    subscriber.next(windows[0].asObservable());
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      for (const window2 of windows) {
        window2.next(value);
      }
      const c = count2 - windowSize + 1;
      if (c >= 0 && c % startEvery === 0) {
        windows.shift().complete();
      }
      if (++count2 % startEvery === 0) {
        const window2 = new Subject();
        windows.push(window2);
        subscriber.next(window2.asObservable());
      }
    }, () => {
      while (windows.length > 0) {
        windows.shift().complete();
      }
      subscriber.complete();
    }, (err) => {
      while (windows.length > 0) {
        windows.shift().error(err);
      }
      subscriber.error(err);
    }, () => {
      starts = null;
      windows = null;
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/windowTime.js
function windowTime(windowTimeSpan, ...otherArgs) {
  var _a, _b;
  const scheduler = (_a = popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : asyncScheduler;
  const windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
  const maxWindowSize = otherArgs[1] || Infinity;
  return operate((source, subscriber) => {
    let windowRecords = [];
    let restartOnClose = false;
    const closeWindow = (record) => {
      const { window: window2, subs } = record;
      window2.complete();
      subs.unsubscribe();
      arrRemove(windowRecords, record);
      restartOnClose && startWindow();
    };
    const startWindow = () => {
      if (windowRecords) {
        const subs = new Subscription();
        subscriber.add(subs);
        const window2 = new Subject();
        const record = {
          window: window2,
          subs,
          seen: 0
        };
        windowRecords.push(record);
        subscriber.next(window2.asObservable());
        executeSchedule(subs, scheduler, () => closeWindow(record), windowTimeSpan);
      }
    };
    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
      executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
    } else {
      restartOnClose = true;
    }
    startWindow();
    const loop = (cb) => windowRecords.slice().forEach(cb);
    const terminate = (cb) => {
      loop(({ window: window2 }) => cb(window2));
      cb(subscriber);
      subscriber.unsubscribe();
    };
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      loop((record) => {
        record.window.next(value);
        maxWindowSize <= ++record.seen && closeWindow(record);
      });
    }, () => terminate((consumer) => consumer.complete()), (err) => terminate((consumer) => consumer.error(err))));
    return () => {
      windowRecords = null;
    };
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/windowToggle.js
function windowToggle(openings, closingSelector) {
  return operate((source, subscriber) => {
    const windows = [];
    const handleError = (err) => {
      while (0 < windows.length) {
        windows.shift().error(err);
      }
      subscriber.error(err);
    };
    innerFrom(openings).subscribe(createOperatorSubscriber(subscriber, (openValue) => {
      const window2 = new Subject();
      windows.push(window2);
      const closingSubscription = new Subscription();
      const closeWindow = () => {
        arrRemove(windows, window2);
        window2.complete();
        closingSubscription.unsubscribe();
      };
      let closingNotifier;
      try {
        closingNotifier = innerFrom(closingSelector(openValue));
      } catch (err) {
        handleError(err);
        return;
      }
      subscriber.next(window2.asObservable());
      closingSubscription.add(closingNotifier.subscribe(createOperatorSubscriber(subscriber, closeWindow, noop, handleError)));
    }, noop));
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      const windowsCopy = windows.slice();
      for (const window2 of windowsCopy) {
        window2.next(value);
      }
    }, () => {
      while (0 < windows.length) {
        windows.shift().complete();
      }
      subscriber.complete();
    }, handleError, () => {
      while (0 < windows.length) {
        windows.shift().unsubscribe();
      }
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/windowWhen.js
function windowWhen(closingSelector) {
  return operate((source, subscriber) => {
    let window2;
    let closingSubscriber;
    const handleError = (err) => {
      window2.error(err);
      subscriber.error(err);
    };
    const openWindow = () => {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      window2 === null || window2 === void 0 ? void 0 : window2.complete();
      window2 = new Subject();
      subscriber.next(window2.asObservable());
      let closingNotifier;
      try {
        closingNotifier = innerFrom(closingSelector());
      } catch (err) {
        handleError(err);
        return;
      }
      closingNotifier.subscribe(closingSubscriber = createOperatorSubscriber(subscriber, openWindow, openWindow, handleError));
    };
    openWindow();
    source.subscribe(createOperatorSubscriber(subscriber, (value) => window2.next(value), () => {
      window2.complete();
      subscriber.complete();
    }, handleError, () => {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      window2 = null;
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/withLatestFrom.js
function withLatestFrom(...inputs) {
  const project = popResultSelector(inputs);
  return operate((source, subscriber) => {
    const len = inputs.length;
    const otherValues = new Array(len);
    let hasValue = inputs.map(() => false);
    let ready = false;
    for (let i = 0; i < len; i++) {
      innerFrom(inputs[i]).subscribe(createOperatorSubscriber(subscriber, (value) => {
        otherValues[i] = value;
        if (!ready && !hasValue[i]) {
          hasValue[i] = true;
          (ready = hasValue.every(identity)) && (hasValue = null);
        }
      }, noop));
    }
    source.subscribe(createOperatorSubscriber(subscriber, (value) => {
      if (ready) {
        const values = [value, ...otherValues];
        subscriber.next(project ? project(...values) : values);
      }
    }));
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/zipAll.js
function zipAll(project) {
  return joinAllInternals(zip, project);
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/zip.js
function zip2(...sources) {
  return operate((source, subscriber) => {
    zip(source, ...sources).subscribe(subscriber);
  });
}

// ../esmd/npm/rxjs@7.8.1/node_modules/.pnpm/rxjs@7.8.1/node_modules/rxjs/dist/esm/internal/operators/zipWith.js
function zipWith(...otherInputs) {
  return zip2(...otherInputs);
}
export {
  ArgumentOutOfRangeError,
  AsyncSubject,
  BehaviorSubject,
  ConnectableObservable,
  EMPTY,
  EmptyError,
  NEVER,
  NotFoundError,
  Notification,
  NotificationKind,
  ObjectUnsubscribedError,
  Observable,
  ReplaySubject,
  Scheduler,
  SequenceError,
  Subject,
  Subscriber,
  Subscription,
  TimeoutError,
  UnsubscriptionError,
  VirtualAction,
  VirtualTimeScheduler,
  animationFrame,
  animationFrameScheduler,
  animationFrames,
  asap,
  asapScheduler,
  async,
  asyncScheduler,
  audit,
  auditTime,
  bindCallback,
  bindNodeCallback,
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  catchError,
  combineAll,
  combineLatest,
  combineLatestAll,
  combineLatestWith,
  concat,
  concatAll,
  concatMap,
  concatMapTo,
  concatWith,
  config,
  connect,
  connectable,
  count,
  debounce,
  debounceTime,
  defaultIfEmpty,
  defer,
  delay,
  delayWhen,
  dematerialize,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  elementAt,
  empty,
  endWith,
  every,
  exhaust,
  exhaustAll,
  exhaustMap,
  expand,
  filter,
  finalize,
  find,
  findIndex,
  first,
  firstValueFrom,
  flatMap,
  forkJoin,
  from,
  fromEvent,
  fromEventPattern,
  generate,
  groupBy,
  identity,
  ignoreElements,
  iif,
  interval,
  isEmpty,
  isObservable,
  last2 as last,
  lastValueFrom,
  map,
  mapTo,
  materialize,
  max,
  merge,
  mergeAll,
  mergeMap,
  mergeMapTo,
  mergeScan,
  mergeWith,
  min,
  multicast,
  never,
  noop,
  observable,
  observeOn,
  of,
  onErrorResumeNext,
  onErrorResumeNextWith,
  pairs,
  pairwise,
  partition,
  pipe,
  pluck,
  publish,
  publishBehavior,
  publishLast,
  publishReplay,
  queue,
  queueScheduler,
  race,
  raceWith,
  range,
  reduce,
  refCount,
  repeat,
  repeatWhen,
  retry,
  retryWhen,
  sample,
  sampleTime,
  scan,
  scheduled,
  sequenceEqual,
  share,
  shareReplay,
  single,
  skip,
  skipLast,
  skipUntil,
  skipWhile,
  startWith,
  subscribeOn,
  switchAll,
  switchMap,
  switchMapTo,
  switchScan,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  throttleTime,
  throwError,
  throwIfEmpty,
  timeInterval,
  timeout,
  timeoutWith,
  timer,
  timestamp,
  toArray,
  using,
  window,
  windowCount,
  windowTime,
  windowToggle,
  windowWhen,
  withLatestFrom,
  zip,
  zipAll,
  zipWith
};
//# sourceMappingURL=rxjs.development.mjs.map