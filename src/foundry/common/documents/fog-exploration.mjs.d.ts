// FOUNDRY_VERSION: 10.291

import type Document from "../abstract/document.mjs";
import type { DocumentMetadata, DocumentModificationOptions } from "../abstract/document.mjs";
import type * as fields from "../data/fields.mjs";
import type * as documents from "./module.mjs";

declare global {
  type FogExplorationData = BaseFogExploration.Properties;
}

/**
 * The Document definition for FogExploration.
 * Defines the DataSchema and common behaviors for FogExploration which are shared between both client and server.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseFogExploration extends BaseFogExploration.Properties {}
declare class BaseFogExploration extends Document<BaseFogExploration.SchemaField, BaseFogExploration.Metadata> {
  /**
   * @param data    - Initial data from which to construct the FogExploration
   * @param context - Construction context options
   */
  constructor(data: BaseFogExploration.ConstructorData, context?: DocumentConstructionContext);

  static override metadata: BaseFogExploration.Metadata;

  static override defineSchema(): BaseFogExploration.Schema;

  static #canModify(user: documents.BaseUser, doc: BaseFogExploration);

  protected override _preUpdate(
    changed: fields.SchemaField.AssignmentType<documents.BaseFogExploration.Schema, {}>,
    options: DocumentModificationOptions,
    user: documents.BaseUser
  ): Promise<void>;
}
export default BaseFogExploration;

declare namespace BaseFogExploration {
  type Metadata = Merge<
    DocumentMetadata,
    {
      name: "FogExploration";
      collection: "fog";
      label: "DOCUMENT.FogExploration";
      labelPlural: "DOCUMENT.FogExplorations";
      isPrimary: true;
      permissions: {
        create: "PLAYER";
        update: (user: documents.BaseUser, doc: Document.Any, data: UpdateData) => boolean;
        delete: (user: documents.BaseUser, doc: Document.Any, data: UpdateData) => boolean;
      };
    }
  >;

  type SchemaField = fields.SchemaField<Schema>;
  type ConstructorData = UpdateData;
  type UpdateData = fields.SchemaField.InnerAssignmentType<Schema>;
  type Properties = fields.SchemaField.InnerInitializedType<Schema>;
  type Source = fields.SchemaField.InnerPersistedType<Schema>;

  interface Schema extends DataSchema {
    /**
     * The _id which uniquely identifies this FogExploration document
     * @defaultValue `null`
     */
    _id: fields.DocumentIdField;

    /**
     * The _id of the Scene document to which this fog applies
     * @defaultValue `null`
     */
    scene: fields.ForeignDocumentField<typeof documents.BaseScene, { initial: () => string | null | undefined }>;

    /**
     * The _id of the User document to which this fog applies
     * @defaultValue `null`
     */
    user: fields.ForeignDocumentField<typeof documents.BaseUser, { initial: () => string | null | undefined }>;

    /**
     * The base64 image/jpeg of the explored fog polygon
     * @defaultValue `null`
     */
    explored: fields.FilePathField<{ categories: ["IMAGE"]; required: true; base64: true }>;

    /**
     * The object of scene positions which have been explored at a certain vision radius
     * @defaultValue `{}`
     */
    positions: fields.ObjectField;

    /**
     * The timestamp at which this fog exploration was last updated
     * @defaultValue `Date.now()`
     */
    timestamp: fields.NumberField<{ nullable: false; initial: ReturnType<typeof Date.now> }>;

    /**
     * An object of optional key/value flags
     * @defaultValue `{}`
     */
    flags: fields.ObjectField.FlagsField<"FogExploration">;
  }
}
