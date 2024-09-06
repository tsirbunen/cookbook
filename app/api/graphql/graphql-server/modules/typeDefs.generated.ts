import type { DocumentNode } from 'graphql';
  export const typeDefs = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Account","loc":{"start":5,"end":12}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":17,"end":19}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":21,"end":24}},"loc":{"start":21,"end":24}},"loc":{"start":21,"end":25}},"directives":[],"loc":{"start":17,"end":25}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"username","loc":{"start":28,"end":36}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":38,"end":44}},"loc":{"start":38,"end":44}},"loc":{"start":38,"end":45}},"directives":[],"loc":{"start":28,"end":45}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"phoneNumber","loc":{"start":48,"end":59}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":61,"end":67}},"loc":{"start":61,"end":67}},"loc":{"start":61,"end":68}},"directives":[],"loc":{"start":48,"end":68}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isVerified","loc":{"start":71,"end":81}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":83,"end":90}},"loc":{"start":83,"end":90}},"loc":{"start":83,"end":91}},"directives":[],"loc":{"start":71,"end":91}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"token","loc":{"start":94,"end":99}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":101,"end":107}},"loc":{"start":101,"end":107}},"directives":[],"loc":{"start":94,"end":107}}],"loc":{"start":0,"end":109}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"AccountInput","loc":{"start":117,"end":129}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"username","loc":{"start":134,"end":142}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":144,"end":150}},"loc":{"start":144,"end":150}},"loc":{"start":144,"end":151}},"directives":[],"loc":{"start":134,"end":151}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"phoneNumber","loc":{"start":154,"end":165}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":167,"end":173}},"loc":{"start":167,"end":173}},"loc":{"start":167,"end":174}},"directives":[],"loc":{"start":154,"end":174}}],"loc":{"start":111,"end":176}},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Mutation","loc":{"start":190,"end":198}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createAccount","loc":{"start":203,"end":216}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"accountInput","loc":{"start":217,"end":229}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountInput","loc":{"start":231,"end":243}},"loc":{"start":231,"end":243}},"loc":{"start":231,"end":244}},"directives":[],"loc":{"start":217,"end":244}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Account","loc":{"start":247,"end":254}},"loc":{"start":247,"end":254}},"directives":[],"loc":{"start":203,"end":254}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"requestVerificationCode","loc":{"start":257,"end":280}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"phoneNumber","loc":{"start":281,"end":292}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":294,"end":300}},"loc":{"start":294,"end":300}},"loc":{"start":294,"end":301}},"directives":[],"loc":{"start":281,"end":301}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":304,"end":311}},"loc":{"start":304,"end":311}},"directives":[],"loc":{"start":257,"end":311}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"signInToAccountWithCode","loc":{"start":314,"end":337}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"code","loc":{"start":338,"end":342}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":344,"end":350}},"loc":{"start":344,"end":350}},"loc":{"start":344,"end":351}},"directives":[],"loc":{"start":338,"end":351}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Account","loc":{"start":354,"end":361}},"loc":{"start":354,"end":361}},"directives":[],"loc":{"start":314,"end":361}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"deleteAccount","loc":{"start":364,"end":377}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":378,"end":380}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":382,"end":385}},"loc":{"start":382,"end":385}},"loc":{"start":382,"end":386}},"directives":[],"loc":{"start":378,"end":386}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":389,"end":396}},"loc":{"start":389,"end":396}},"directives":[],"loc":{"start":364,"end":396}}],"loc":{"start":178,"end":398}},{"kind":"ScalarTypeDefinition","name":{"kind":"Name","value":"File","loc":{"start":406,"end":410}},"directives":[],"loc":{"start":399,"end":410}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation","loc":{"start":417,"end":425}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"pingMutation","loc":{"start":430,"end":442}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":444,"end":450}},"loc":{"start":444,"end":450}},"directives":[],"loc":{"start":430,"end":450}}],"loc":{"start":412,"end":452}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query","loc":{"start":458,"end":463}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"pingQuery","loc":{"start":468,"end":477}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":479,"end":485}},"loc":{"start":479,"end":485}},"directives":[],"loc":{"start":468,"end":485}}],"loc":{"start":453,"end":487}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Ingredient","loc":{"start":493,"end":503}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":508,"end":510}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":512,"end":515}},"loc":{"start":512,"end":515}},"loc":{"start":512,"end":516}},"directives":[],"loc":{"start":508,"end":516}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name","loc":{"start":519,"end":523}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":525,"end":531}},"loc":{"start":525,"end":531}},"loc":{"start":525,"end":532}},"directives":[],"loc":{"start":519,"end":532}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"amount","loc":{"start":535,"end":541}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":543,"end":548}},"loc":{"start":543,"end":548}},"directives":[],"loc":{"start":535,"end":548}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"unit","loc":{"start":551,"end":555}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":557,"end":563}},"loc":{"start":557,"end":563}},"directives":[],"loc":{"start":551,"end":563}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"previousId","loc":{"start":566,"end":576}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":578,"end":581}},"loc":{"start":578,"end":581}},"directives":[],"loc":{"start":566,"end":581}}],"loc":{"start":488,"end":583}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"IngredientInput","loc":{"start":591,"end":606}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":611,"end":613}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":615,"end":618}},"loc":{"start":615,"end":618}},"directives":[],"loc":{"start":611,"end":618}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"name","loc":{"start":621,"end":625}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":627,"end":633}},"loc":{"start":627,"end":633}},"loc":{"start":627,"end":634}},"directives":[],"loc":{"start":621,"end":634}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"amount","loc":{"start":637,"end":643}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float","loc":{"start":645,"end":650}},"loc":{"start":645,"end":650}},"directives":[],"loc":{"start":637,"end":650}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"unit","loc":{"start":653,"end":657}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":659,"end":665}},"loc":{"start":659,"end":665}},"directives":[],"loc":{"start":653,"end":665}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"groupId","loc":{"start":668,"end":675}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":677,"end":680}},"loc":{"start":677,"end":680}},"directives":[],"loc":{"start":668,"end":680}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"previousId","loc":{"start":683,"end":693}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":695,"end":698}},"loc":{"start":695,"end":698}},"directives":[],"loc":{"start":683,"end":698}}],"loc":{"start":585,"end":700}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"IngredientGroup","loc":{"start":707,"end":722}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":727,"end":729}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":731,"end":734}},"loc":{"start":731,"end":734}},"loc":{"start":731,"end":735}},"directives":[],"loc":{"start":727,"end":735}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title","loc":{"start":738,"end":743}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":745,"end":751}},"loc":{"start":745,"end":751}},"directives":[],"loc":{"start":738,"end":751}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"ingredients","loc":{"start":754,"end":765}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Ingredient","loc":{"start":768,"end":778}},"loc":{"start":768,"end":778}},"loc":{"start":768,"end":779}},"loc":{"start":767,"end":780}},"loc":{"start":767,"end":781}},"directives":[],"loc":{"start":754,"end":781}}],"loc":{"start":702,"end":783}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"IngredientGroupInput","loc":{"start":791,"end":811}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":816,"end":818}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":820,"end":823}},"loc":{"start":820,"end":823}},"directives":[],"loc":{"start":816,"end":823}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title","loc":{"start":826,"end":831}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":833,"end":839}},"loc":{"start":833,"end":839}},"directives":[],"loc":{"start":826,"end":839}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"ingredients","loc":{"start":842,"end":853}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientInput","loc":{"start":856,"end":871}},"loc":{"start":856,"end":871}},"loc":{"start":856,"end":872}},"loc":{"start":855,"end":873}},"directives":[],"loc":{"start":842,"end":873}}],"loc":{"start":785,"end":875}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Instruction","loc":{"start":882,"end":893}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":898,"end":900}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":902,"end":905}},"loc":{"start":902,"end":905}},"loc":{"start":902,"end":906}},"directives":[],"loc":{"start":898,"end":906}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"content","loc":{"start":909,"end":916}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":918,"end":924}},"loc":{"start":918,"end":924}},"loc":{"start":918,"end":925}},"directives":[],"loc":{"start":909,"end":925}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"previousId","loc":{"start":928,"end":938}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":940,"end":943}},"loc":{"start":940,"end":943}},"directives":[],"loc":{"start":928,"end":943}}],"loc":{"start":877,"end":945}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"InstructionGroup","loc":{"start":952,"end":968}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":973,"end":975}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":977,"end":980}},"loc":{"start":977,"end":980}},"loc":{"start":977,"end":981}},"directives":[],"loc":{"start":973,"end":981}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title","loc":{"start":984,"end":989}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":991,"end":997}},"loc":{"start":991,"end":997}},"directives":[],"loc":{"start":984,"end":997}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"instructions","loc":{"start":1000,"end":1012}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Instruction","loc":{"start":1015,"end":1026}},"loc":{"start":1015,"end":1026}},"loc":{"start":1015,"end":1027}},"loc":{"start":1014,"end":1028}},"loc":{"start":1014,"end":1029}},"directives":[],"loc":{"start":1000,"end":1029}}],"loc":{"start":947,"end":1031}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"InstructionInput","loc":{"start":1039,"end":1055}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":1060,"end":1062}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1064,"end":1067}},"loc":{"start":1064,"end":1067}},"directives":[],"loc":{"start":1060,"end":1067}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"content","loc":{"start":1070,"end":1077}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1079,"end":1085}},"loc":{"start":1079,"end":1085}},"loc":{"start":1079,"end":1086}},"directives":[],"loc":{"start":1070,"end":1086}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"groupId","loc":{"start":1089,"end":1096}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1098,"end":1101}},"loc":{"start":1098,"end":1101}},"directives":[],"loc":{"start":1089,"end":1101}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"previousId","loc":{"start":1104,"end":1114}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1116,"end":1119}},"loc":{"start":1116,"end":1119}},"directives":[],"loc":{"start":1104,"end":1119}}],"loc":{"start":1033,"end":1121}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"InstructionGroupInput","loc":{"start":1129,"end":1150}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"id","loc":{"start":1155,"end":1157}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1159,"end":1162}},"loc":{"start":1159,"end":1162}},"directives":[],"loc":{"start":1155,"end":1162}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title","loc":{"start":1165,"end":1170}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1172,"end":1178}},"loc":{"start":1172,"end":1178}},"directives":[],"loc":{"start":1165,"end":1178}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"instructions","loc":{"start":1181,"end":1193}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InstructionInput","loc":{"start":1196,"end":1212}},"loc":{"start":1196,"end":1212}},"loc":{"start":1196,"end":1213}},"loc":{"start":1195,"end":1214}},"directives":[],"loc":{"start":1181,"end":1214}}],"loc":{"start":1123,"end":1216}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Photo","loc":{"start":1223,"end":1228}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":1233,"end":1235}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1237,"end":1240}},"loc":{"start":1237,"end":1240}},"loc":{"start":1237,"end":1241}},"directives":[],"loc":{"start":1233,"end":1241}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"url","loc":{"start":1244,"end":1247}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1249,"end":1255}},"loc":{"start":1249,"end":1255}},"loc":{"start":1249,"end":1256}},"directives":[],"loc":{"start":1244,"end":1256}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isMainPhoto","loc":{"start":1259,"end":1270}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":1272,"end":1279}},"loc":{"start":1272,"end":1279}},"loc":{"start":1272,"end":1280}},"directives":[],"loc":{"start":1259,"end":1280}}],"loc":{"start":1218,"end":1282}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"PhotoInput","loc":{"start":1290,"end":1300}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"url","loc":{"start":1305,"end":1308}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1310,"end":1316}},"loc":{"start":1310,"end":1316}},"loc":{"start":1310,"end":1317}},"directives":[],"loc":{"start":1305,"end":1317}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"isMainPhoto","loc":{"start":1320,"end":1331}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":1333,"end":1340}},"loc":{"start":1333,"end":1340}},"loc":{"start":1333,"end":1341}},"directives":[],"loc":{"start":1320,"end":1341}}],"loc":{"start":1284,"end":1343}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Tag","loc":{"start":1350,"end":1353}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":1358,"end":1360}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1362,"end":1365}},"loc":{"start":1362,"end":1365}},"loc":{"start":1362,"end":1366}},"directives":[],"loc":{"start":1358,"end":1366}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tag","loc":{"start":1369,"end":1372}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1374,"end":1380}},"loc":{"start":1374,"end":1380}},"loc":{"start":1374,"end":1381}},"directives":[],"loc":{"start":1369,"end":1381}}],"loc":{"start":1345,"end":1383}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Language","loc":{"start":1390,"end":1398}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":1403,"end":1405}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1407,"end":1410}},"loc":{"start":1407,"end":1410}},"loc":{"start":1407,"end":1411}},"directives":[],"loc":{"start":1403,"end":1411}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"language","loc":{"start":1414,"end":1422}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1424,"end":1430}},"loc":{"start":1424,"end":1430}},"loc":{"start":1424,"end":1431}},"directives":[],"loc":{"start":1414,"end":1431}}],"loc":{"start":1385,"end":1433}},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Recipe","loc":{"start":1440,"end":1446}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id","loc":{"start":1451,"end":1453}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1455,"end":1458}},"loc":{"start":1455,"end":1458}},"loc":{"start":1455,"end":1459}},"directives":[],"loc":{"start":1451,"end":1459}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"title","loc":{"start":1462,"end":1467}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1469,"end":1475}},"loc":{"start":1469,"end":1475}},"loc":{"start":1469,"end":1476}},"directives":[],"loc":{"start":1462,"end":1476}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"description","loc":{"start":1479,"end":1490}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1492,"end":1498}},"loc":{"start":1492,"end":1498}},"directives":[],"loc":{"start":1479,"end":1498}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"photos","loc":{"start":1501,"end":1507}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Photo","loc":{"start":1510,"end":1515}},"loc":{"start":1510,"end":1515}},"loc":{"start":1510,"end":1516}},"loc":{"start":1509,"end":1517}},"directives":[],"loc":{"start":1501,"end":1517}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tags","loc":{"start":1520,"end":1524}},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Tag","loc":{"start":1527,"end":1530}},"loc":{"start":1527,"end":1530}},"loc":{"start":1527,"end":1531}},"loc":{"start":1526,"end":1532}},"directives":[],"loc":{"start":1520,"end":1532}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"ovenNeeded","loc":{"start":1535,"end":1545}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":1547,"end":1554}},"loc":{"start":1547,"end":1554}},"loc":{"start":1547,"end":1555}},"directives":[],"loc":{"start":1535,"end":1555}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"language","loc":{"start":1558,"end":1566}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language","loc":{"start":1568,"end":1576}},"loc":{"start":1568,"end":1576}},"loc":{"start":1568,"end":1577}},"directives":[],"loc":{"start":1558,"end":1577}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isPrivate","loc":{"start":1580,"end":1589}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":1591,"end":1598}},"loc":{"start":1591,"end":1598}},"directives":[],"loc":{"start":1580,"end":1598}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"authorId","loc":{"start":1601,"end":1609}},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1611,"end":1614}},"loc":{"start":1611,"end":1614}},"directives":[],"loc":{"start":1601,"end":1614}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"ingredientGroups","loc":{"start":1617,"end":1633}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientGroup","loc":{"start":1636,"end":1651}},"loc":{"start":1636,"end":1651}},"loc":{"start":1636,"end":1652}},"loc":{"start":1635,"end":1653}},"loc":{"start":1635,"end":1654}},"directives":[],"loc":{"start":1617,"end":1654}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"instructionGroups","loc":{"start":1657,"end":1674}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InstructionGroup","loc":{"start":1677,"end":1693}},"loc":{"start":1677,"end":1693}},"loc":{"start":1677,"end":1694}},"loc":{"start":1676,"end":1695}},"loc":{"start":1676,"end":1696}},"directives":[],"loc":{"start":1657,"end":1696}}],"loc":{"start":1435,"end":1698}},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"RecipeInput","loc":{"start":1706,"end":1717}},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"title","loc":{"start":1722,"end":1727}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1729,"end":1735}},"loc":{"start":1729,"end":1735}},"directives":[],"loc":{"start":1722,"end":1735}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"description","loc":{"start":1738,"end":1749}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1751,"end":1757}},"loc":{"start":1751,"end":1757}},"directives":[],"loc":{"start":1738,"end":1757}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"photoFiles","loc":{"start":1760,"end":1770}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"File","loc":{"start":1773,"end":1777}},"loc":{"start":1773,"end":1777}},"loc":{"start":1773,"end":1778}},"loc":{"start":1772,"end":1779}},"directives":[],"loc":{"start":1760,"end":1779}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"photoIdentifiers","loc":{"start":1782,"end":1798}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1801,"end":1807}},"loc":{"start":1801,"end":1807}},"loc":{"start":1801,"end":1808}},"loc":{"start":1800,"end":1809}},"directives":[],"loc":{"start":1782,"end":1809}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"tags","loc":{"start":1812,"end":1816}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1819,"end":1825}},"loc":{"start":1819,"end":1825}},"loc":{"start":1819,"end":1826}},"loc":{"start":1818,"end":1827}},"directives":[],"loc":{"start":1812,"end":1827}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"language","loc":{"start":1830,"end":1838}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String","loc":{"start":1840,"end":1846}},"loc":{"start":1840,"end":1846}},"directives":[],"loc":{"start":1830,"end":1846}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"ovenNeeded","loc":{"start":1849,"end":1859}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":1861,"end":1868}},"loc":{"start":1861,"end":1868}},"directives":[],"loc":{"start":1849,"end":1868}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"isPrivate","loc":{"start":1871,"end":1880}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean","loc":{"start":1882,"end":1889}},"loc":{"start":1882,"end":1889}},"directives":[],"loc":{"start":1871,"end":1889}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"authorId","loc":{"start":1892,"end":1900}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":1902,"end":1905}},"loc":{"start":1902,"end":1905}},"directives":[],"loc":{"start":1892,"end":1905}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"ingredientGroups","loc":{"start":1908,"end":1924}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IngredientGroupInput","loc":{"start":1927,"end":1947}},"loc":{"start":1927,"end":1947}},"loc":{"start":1927,"end":1948}},"loc":{"start":1926,"end":1949}},"directives":[],"loc":{"start":1908,"end":1949}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"instructionGroups","loc":{"start":1952,"end":1969}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InstructionGroupInput","loc":{"start":1972,"end":1993}},"loc":{"start":1972,"end":1993}},"loc":{"start":1972,"end":1994}},"loc":{"start":1971,"end":1995}},"directives":[],"loc":{"start":1952,"end":1995}}],"loc":{"start":1700,"end":1997}},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Query","loc":{"start":2011,"end":2016}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"allRecipes","loc":{"start":2021,"end":2031}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe","loc":{"start":2034,"end":2040}},"loc":{"start":2034,"end":2040}},"loc":{"start":2034,"end":2041}},"loc":{"start":2033,"end":2042}},"loc":{"start":2033,"end":2043}},"directives":[],"loc":{"start":2021,"end":2043}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"allLanguages","loc":{"start":2046,"end":2058}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language","loc":{"start":2061,"end":2069}},"loc":{"start":2061,"end":2069}},"loc":{"start":2061,"end":2070}},"loc":{"start":2060,"end":2071}},"loc":{"start":2060,"end":2072}},"directives":[],"loc":{"start":2046,"end":2072}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"allTags","loc":{"start":2075,"end":2082}},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Tag","loc":{"start":2085,"end":2088}},"loc":{"start":2085,"end":2088}},"loc":{"start":2085,"end":2089}},"loc":{"start":2084,"end":2090}},"loc":{"start":2084,"end":2091}},"directives":[],"loc":{"start":2075,"end":2091}}],"loc":{"start":1999,"end":2093}},{"kind":"ObjectTypeExtension","name":{"kind":"Name","value":"Mutation","loc":{"start":2107,"end":2115}},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createRecipe","loc":{"start":2120,"end":2132}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"recipeInput","loc":{"start":2133,"end":2144}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeInput","loc":{"start":2146,"end":2157}},"loc":{"start":2146,"end":2157}},"loc":{"start":2146,"end":2158}},"directives":[],"loc":{"start":2133,"end":2158}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe","loc":{"start":2161,"end":2167}},"loc":{"start":2161,"end":2167}},"directives":[],"loc":{"start":2120,"end":2167}},{"kind":"FieldDefinition","name":{"kind":"Name","value":"patchRecipe","loc":{"start":2170,"end":2181}},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"recipeId","loc":{"start":2182,"end":2190}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int","loc":{"start":2192,"end":2195}},"loc":{"start":2192,"end":2195}},"loc":{"start":2192,"end":2196}},"directives":[],"loc":{"start":2182,"end":2196}},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"recipePatch","loc":{"start":2198,"end":2209}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeInput","loc":{"start":2211,"end":2222}},"loc":{"start":2211,"end":2222}},"loc":{"start":2211,"end":2223}},"directives":[],"loc":{"start":2198,"end":2223}}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe","loc":{"start":2226,"end":2232}},"loc":{"start":2226,"end":2232}},"directives":[],"loc":{"start":2170,"end":2232}}],"loc":{"start":2095,"end":2234}}],"loc":{"start":0,"end":2235}} as unknown as DocumentNode