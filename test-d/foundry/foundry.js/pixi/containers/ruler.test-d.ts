import { expectType } from 'tsd';

if (game instanceof Game) {
  expectType<Ruler>(new Ruler(undefined));
  expectType<Ruler>(new Ruler(game.user, { color: null }));
  expectType<Ruler>(new Ruler(game.user, { color: 0x32f4e2 }));
}

const ruler = new Ruler();
expectType<User>(ruler.user);
expectType<string>(ruler.name);
expectType<number>(ruler.color);
expectType<PIXI.Point[]>(ruler.waypoints);
expectType<PIXI.Point | null>(ruler.destination);
expectType<PIXI.Graphics>(ruler.ruler);
expectType<PIXI.Container>(ruler.labels);
expectType<{ INACTIVE: 0; STARTING: 1; MEASURING: 2; MOVING: 3 }>(Ruler.STATES);
expectType<boolean>(ruler.active);

expectType<Array<{ ray: Ray; label: PIXI.DisplayObject }>>(ruler.measure(new PIXI.Point()));
expectType<Array<{ ray: Ray; label: PIXI.DisplayObject }>>(ruler.measure({ x: 10, y: 10 }, {}));
expectType<Array<{ ray: Ray; label: PIXI.DisplayObject }>>(ruler.measure({ x: 10, y: 10 }, { gridSpaces: true }));

expectType<Promise<false | undefined>>(ruler.moveToken());
expectType<void>(ruler.clear());
expectType<{
  class: 'Ruler';
  name: string;
  waypoints: PIXI.Point[];
  destination: PIXI.Point | null;
  _state: 0 | 1 | 2 | 3;
}>(ruler.toJSON());
expectType<void>(ruler.update(ruler.toJSON()));