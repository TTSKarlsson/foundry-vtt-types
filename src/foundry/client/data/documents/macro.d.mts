import type { ConfiguredDocumentClassForName } from "../../../../types/helperTypes.d.mts";

export {};

declare global {
  /**
   * The client-side Macro document which extends the common BaseMacro model.
   *
   * @see {@link Macros}            The world-level collection of Macro documents
   * @see {@link MacroConfig}       The Macro configuration application
   *
   * @param data - Initial data provided to construct the Macro document
   */
  class Macro extends ClientDocumentMixin(foundry.documents.BaseMacro) {
    /**
     * Is the current User the author of this macro?
     */
    get isAuthor(): boolean;

    /**
     * Test whether the current user is capable of executing a Macro script
     */
    get canExecute(): boolean;

    /**
     * Provide a thumbnail image path used to represent this document.
     */
    get thumbnail(): string | null;

    /**
     * Execute the Macro command.
     * @param scope - Macro execution scope which is passed to script macros
     * @returns A created ChatMessage from chat macros or returned value from script macros
     */

    // TODO: Test if additional scope can be passed
    execute(
      scope?: Scope,
    ): this["type"] extends "chat" ? InstanceType<ConfiguredDocumentClassForName<"ChatMessage">> : any;

    _onClickDocumentLink(event: MouseEvent): ReturnType<this["execute"]>;
  }
}
interface Scope {
  /**
   * An Actor who is the protagonist of the executed action
   */
  actor?: Actor;

  /**
   * A Token which is the protagonist of the executed action
   */
  token?: Token;
}
