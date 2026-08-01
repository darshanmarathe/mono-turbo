
    export type RemoteKeys = 'kitchenSink/Widget';
    type PackageType<T> = T extends 'kitchenSink/Widget' ? typeof import('kitchenSink/Widget') :any;