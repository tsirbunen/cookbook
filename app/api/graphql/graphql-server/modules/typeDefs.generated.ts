import type { DocumentNode } from 'graphql';
  export const typeDefs = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation","loc":{"start":5,"end":13}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"pingMutation","loc":{"start":18,"end":30}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":32,"end":38}},"loc":{"start":32,"end":38}},"directives":[],"loc":{"start":18,"end":38}}],"loc":{"start":0,"end":40}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":46,"end":51}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"pingQuery","loc":{"start":56,"end":65}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":67,"end":73}},"loc":{"start":67,"end":73}},"directives":[],"loc":{"start":56,"end":73}}],"loc":{"start":41,"end":75}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Ingredient","loc":{"start":81,"end":91}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":96,"end":98}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":100,"end":103}},"loc":{"start":100,"end":103}},"loc":{"start":100,"end":104}},"directives":[],"loc":{"start":96,"end":104}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name","loc":{"start":107,"end":111}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":113,"end":119}},"loc":{"start":113,"end":119}},"loc":{"start":113,"end":120}},"directives":[],"loc":{"start":107,"end":120}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"amount","loc":{"start":123,"end":129}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":131,"end":136}},"loc":{"start":131,"end":136}},"directives":[],"loc":{"start":123,"end":136}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"unit","loc":{"start":139,"end":143}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":145,"end":151}},"loc":{"start":145,"end":151}},"directives":[],"loc":{"start":139,"end":151}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"previousIngredientId","loc":{"start":154,"end":174}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":176,"end":179}},"loc":{"start":176,"end":179}},"directives":[],"loc":{"start":154,"end":179}}],"loc":{"start":76,"end":181}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"IngredientGroup","loc":{"start":188,"end":203}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":208,"end":210}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":212,"end":215}},"loc":{"start":212,"end":215}},"loc":{"start":212,"end":216}},"directives":[],"loc":{"start":208,"end":216}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title","loc":{"start":219,"end":224}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":226,"end":232}},"loc":{"start":226,"end":232}},"directives":[],"loc":{"start":219,"end":232}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"ingredients","loc":{"start":235,"end":246}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Ingredient","loc":{"start":249,"end":259}},"loc":{"start":249,"end":259}},"loc":{"start":249,"end":260}},"loc":{"start":248,"end":261}},"loc":{"start":248,"end":262}},"directives":[],"loc":{"start":235,"end":262}}],"loc":{"start":183,"end":264}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Instruction","loc":{"start":271,"end":282}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":287,"end":289}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":291,"end":294}},"loc":{"start":291,"end":294}},"loc":{"start":291,"end":295}},"directives":[],"loc":{"start":287,"end":295}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"content","loc":{"start":298,"end":305}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":307,"end":313}},"loc":{"start":307,"end":313}},"loc":{"start":307,"end":314}},"directives":[],"loc":{"start":298,"end":314}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"previousInstructionId","loc":{"start":317,"end":338}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":340,"end":343}},"loc":{"start":340,"end":343}},"directives":[],"loc":{"start":317,"end":343}}],"loc":{"start":266,"end":345}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"InstructionGroup","loc":{"start":352,"end":368}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":373,"end":375}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":377,"end":380}},"loc":{"start":377,"end":380}},"loc":{"start":377,"end":381}},"directives":[],"loc":{"start":373,"end":381}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title","loc":{"start":384,"end":389}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":391,"end":397}},"loc":{"start":391,"end":397}},"directives":[],"loc":{"start":384,"end":397}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"instructions","loc":{"start":400,"end":412}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Instruction","loc":{"start":415,"end":426}},"loc":{"start":415,"end":426}},"loc":{"start":415,"end":427}},"loc":{"start":414,"end":428}},"loc":{"start":414,"end":429}},"directives":[],"loc":{"start":400,"end":429}}],"loc":{"start":347,"end":431}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Photo","loc":{"start":438,"end":443}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":448,"end":450}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":452,"end":455}},"loc":{"start":452,"end":455}},"loc":{"start":452,"end":456}},"directives":[],"loc":{"start":448,"end":456}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url","loc":{"start":459,"end":462}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":464,"end":470}},"loc":{"start":464,"end":470}},"loc":{"start":464,"end":471}},"directives":[],"loc":{"start":459,"end":471}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isMainPhoto","loc":{"start":474,"end":485}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":487,"end":494}},"loc":{"start":487,"end":494}},"loc":{"start":487,"end":495}},"directives":[],"loc":{"start":474,"end":495}}],"loc":{"start":433,"end":497}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Tag","loc":{"start":504,"end":507}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":512,"end":514}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":516,"end":519}},"loc":{"start":516,"end":519}},"loc":{"start":516,"end":520}},"directives":[],"loc":{"start":512,"end":520}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tag","loc":{"start":523,"end":526}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":528,"end":534}},"loc":{"start":528,"end":534}},"loc":{"start":528,"end":535}},"directives":[],"loc":{"start":523,"end":535}}],"loc":{"start":499,"end":537}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Language","loc":{"start":544,"end":552}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":557,"end":559}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":561,"end":564}},"loc":{"start":561,"end":564}},"loc":{"start":561,"end":565}},"directives":[],"loc":{"start":557,"end":565}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"language","loc":{"start":568,"end":576}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":578,"end":584}},"loc":{"start":578,"end":584}},"loc":{"start":578,"end":585}},"directives":[],"loc":{"start":568,"end":585}}],"loc":{"start":539,"end":587}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Recipe","loc":{"start":594,"end":600}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":605,"end":607}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":609,"end":612}},"loc":{"start":609,"end":612}},"loc":{"start":609,"end":613}},"directives":[],"loc":{"start":605,"end":613}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title","loc":{"start":616,"end":621}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":623,"end":629}},"loc":{"start":623,"end":629}},"loc":{"start":623,"end":630}},"directives":[],"loc":{"start":616,"end":630}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"description","loc":{"start":633,"end":644}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":646,"end":652}},"loc":{"start":646,"end":652}},"directives":[],"loc":{"start":633,"end":652}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"photos","loc":{"start":655,"end":661}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Photo","loc":{"start":664,"end":669}},"loc":{"start":664,"end":669}},"loc":{"start":664,"end":670}},"loc":{"start":663,"end":671}},"directives":[],"loc":{"start":655,"end":671}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tags","loc":{"start":674,"end":678}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Tag","loc":{"start":681,"end":684}},"loc":{"start":681,"end":684}},"loc":{"start":681,"end":685}},"loc":{"start":680,"end":686}},"directives":[],"loc":{"start":674,"end":686}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"category","loc":{"start":689,"end":697}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":699,"end":705}},"loc":{"start":699,"end":705}},"directives":[],"loc":{"start":689,"end":705}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"ovenNeeded","loc":{"start":708,"end":718}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":720,"end":727}},"loc":{"start":720,"end":727}},"loc":{"start":720,"end":728}},"directives":[],"loc":{"start":708,"end":728}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"language","loc":{"start":731,"end":739}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language","loc":{"start":741,"end":749}},"loc":{"start":741,"end":749}},"loc":{"start":741,"end":750}},"directives":[],"loc":{"start":731,"end":750}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"ingredientGroups","loc":{"start":753,"end":769}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientGroup","loc":{"start":772,"end":787}},"loc":{"start":772,"end":787}},"loc":{"start":772,"end":788}},"loc":{"start":771,"end":789}},"loc":{"start":771,"end":790}},"directives":[],"loc":{"start":753,"end":790}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"instructionGroups","loc":{"start":793,"end":810}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InstructionGroup","loc":{"start":813,"end":829}},"loc":{"start":813,"end":829}},"loc":{"start":813,"end":830}},"loc":{"start":812,"end":831}},"loc":{"start":812,"end":832}},"directives":[],"loc":{"start":793,"end":832}}],"loc":{"start":589,"end":834}},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Query","loc":{"start":848,"end":853}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"allRecipes","loc":{"start":858,"end":868}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe","loc":{"start":871,"end":877}},"loc":{"start":871,"end":877}},"loc":{"start":871,"end":878}},"loc":{"start":870,"end":879}},"loc":{"start":870,"end":880}},"directives":[],"loc":{"start":858,"end":880}}],"loc":{"start":836,"end":882}}],"loc":{"start":0,"end":883}} as unknown as DocumentNode