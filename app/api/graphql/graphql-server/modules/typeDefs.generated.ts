import type { DocumentNode } from 'graphql';
  export const typeDefs = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation","loc":{"start":5,"end":13}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"pingMutation","loc":{"start":18,"end":30}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":32,"end":38}},"loc":{"start":32,"end":38}},"directives":[],"loc":{"start":18,"end":38}}],"loc":{"start":0,"end":40}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":46,"end":51}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"pingQuery","loc":{"start":56,"end":65}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":67,"end":73}},"loc":{"start":67,"end":73}},"directives":[],"loc":{"start":56,"end":73}}],"loc":{"start":41,"end":75}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Recipe","loc":{"start":81,"end":87}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":92,"end":94}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":96,"end":99}},"loc":{"start":96,"end":99}},"loc":{"start":96,"end":100}},"directives":[],"loc":{"start":92,"end":100}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title","loc":{"start":103,"end":108}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":110,"end":116}},"loc":{"start":110,"end":116}},"loc":{"start":110,"end":117}},"directives":[],"loc":{"start":103,"end":117}}],"loc":{"start":76,"end":119}},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Query","loc":{"start":133,"end":138}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"allRecipes","loc":{"start":143,"end":153}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe","loc":{"start":156,"end":162}},"loc":{"start":156,"end":162}},"loc":{"start":155,"end":163}},"loc":{"start":155,"end":164}},"directives":[],"loc":{"start":143,"end":164}}],"loc":{"start":121,"end":166}}],"loc":{"start":0,"end":167}} as unknown as DocumentNode