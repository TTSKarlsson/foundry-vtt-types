import { expectType } from 'tsd';

const folders = new Folders();
expectType<StoredDocument<Folder>>(folders.get('', { strict: true }));
expectType<StoredDocument<Folder>['data']['_source'][]>(folders.toJSON());
expectType<null | SidebarDirectory<'Folder'> | undefined>(folders.directory);
