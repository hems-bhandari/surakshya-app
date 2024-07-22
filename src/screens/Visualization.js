import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import uuid from "react-native-uuid";
const sign = require("jwt-encode");
const moment = require("moment");


export const tableauUrl1 = "https://prod-apnortheast-a.online.tableau.com/t/incubate/views/Book1/Sheet1";
export const tableauUrl2 = "https://prod-apnortheast-a.online.tableau.com/t/incubate/views/Book2/Sheet1";
export const tableauUrl3 = "https://prod-apnortheast-a.online.tableau.com/t/incubate/views/Book3/Sheet1";
export const tableauUrl4 = "https://prod-apnortheast-a.online.tableau.com/t/incubate/views/Book4/Sheet1";
export const tableauUrl5 = "https://prod-apnortheast-a.online.tableau.com/t/incubate/views/Book5/Sheet1";
export const tableauUrl6 = "https://prod-apnortheast-a.online.tableau.com/t/incubate/views/Book6/Sheet1";

export const email = "shreejaysubedi78@uniglobecollege.edu.np";

function Visualization({ i18n }) {

const payload = {
  iss: process.env.connectedAppClientId,
  exp: moment.utc().add(3, "minutes").unix(),
  jti: uuid.v4(),
  aud: "tableau",
  sub: email,
  scp: ["tableau:views:embed", "tableau:metrics:embed"],
};

const payload2 = {
  iss: process.env.connectedAppClientId2,
  exp: moment.utc().add(3, "minutes").unix(),
  jti: uuid.v4(),
  aud: "tableau",
  sub: email,
  scp: ["tableau:views:embed", "tableau:metrics:embed"],
};

const payload3 = {
  iss: process.env.connectedAppClientId3,
  exp: moment.utc().add(3, "minutes").unix(),
  jti: uuid.v4(),
  aud: "tableau",
  sub: email,
  scp: ["tableau:views:embed", "tableau:metrics:embed"],
};

const payload4 = {
  iss: process.env.connectedAppClientId4,
  exp: moment.utc().add(3, "minutes").unix(),
  jti: uuid.v4(),
  aud: "tableau",
  sub: email,
  scp: ["tableau:views:embed", "tableau:metrics:embed"],
};

const payload5 = {
  iss: process.env.connectedAppClientId5,
  exp: moment.utc().add(3, "minutes").unix(),
  jti: uuid.v4(),
  aud: "tableau",
  sub: email,
  scp: ["tableau:views:embed", "tableau:metrics:embed"],
};

const payload6 = {
  iss: process.env.connectedAppClientId6,
  exp: moment.utc().add(3, "minutes").unix(),
  jti: uuid.v4(),
  aud: "tableau",
  sub: email,
  scp: ["tableau:views:embed", "tableau:metrics:embed"],
};


const headers = {
  kid: process.env.connectedAppSecretId,
  iss: process.env.connectedAppClientId,
};

const headers2 = {
  kid: process.env.connectedAppSecretId2,
  iss: process.env.connectedAppClientId2,
};

const headers3 = {
  kid: process.env.connectedAppSecretId3,
  iss: process.env.connectedAppClientId3,
};

const headers4 = {
  kid: process.env.connectedAppSecretId4,
  iss: process.env.connectedAppClientId4,
};

const headers5 = {
  kid: process.env.connectedAppSecretId5,
  iss: process.env.connectedAppClientId5,
};

const headers6 = {
  kid: process.env.connectedAppSecretId6,
  iss: process.env.connectedAppClientId6,
};

jwtToken = sign(payload, process.env.connectedAppSecretKey, headers);

jwtToken2 = sign(payload2, process.env.connectedAppSecretKey2, headers2);

jwtToken3 = sign(payload3, process.env.connectedAppSecretKey3, headers3);

jwtToken4 = sign(payload4, process.env.connectedAppSecretKey4, headers4);

jwtToken5 = sign(payload5, process.env.connectedAppSecretKey5, headers5);

jwtToken6 = sign(payload6, process.env.connectedAppSecretKey6, headers6);

const data = i18n.t("visualization.data");
const visualization = i18n.t("visualization.visualizations");

const htmlContent = `
<html><head>
  <script type="module" src="https://embedding.tableauusercontent.com/tableau.embedding.3.0.0.min.js"></script>
  <body>
  <br>
  <br>
  <br>
  <br>
  <header style="font-size: 26px; text-transform: uppercase; font-weight: bold; text-align: center;">
    <h1 style="display: inline-block; color: #8D64FF;">${data}</h1>
    <h1 style="display: inline;">${visualization}</h1>
  </header>
    <div><tableau-viz id="tableauViz" src="${tableauUrl1}" toolbar="false" iframeSizedToWindow="true" token="${jwtToken}"></tableau-viz><div>
    <div><tableau-viz id="tableauViz" src="${tableauUrl2}" toolbar="false" iframeSizedToWindow="true" token="${jwtToken2}"></tableau-viz><div>
    <div><tableau-viz id="tableauViz" src="${tableauUrl3}" toolbar="false" iframeSizedToWindow="true" token="${jwtToken3}"></tableau-viz><div>
    <div><tableau-viz id="tableauViz" src="${tableauUrl4}" toolbar="false" iframeSizedToWindow="true" token="${jwtToken4}"></tableau-viz><div>
    <div><tableau-viz id="tableauViz" src="${tableauUrl5}" toolbar="false" iframeSizedToWindow="true" token="${jwtToken5}"></tableau-viz><div>
    <div><tableau-viz id="tableauViz" src="${tableauUrl6}" toolbar="false" iframeSizedToWindow="true" token="${jwtToken6}"></tableau-viz><div>
    </body>
</head></html>
`;

return (
  <View style={styles.container}>
    <WebView
      source={{ html: htmlContent }}
      style={styles.webView}
    />
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});

export default Visualization;

