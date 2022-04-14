const { AliyunDriveClient } = require("@chyroc/aliyundrive");
const client = new AliyunDriveClient({});
(async () => {
  const qr = await client.loginByQrcode();
  console.log("info", qr, client);
})();

// "https://passport.aliyundrive.com/newlogin/qrcode/generate.do?" +
//   "appName=aliyun_drive" +
//   "&fromSite=52" +
//   "&appName=aliyun_drive" +
//   "&appEntrance=web" +
//   "&isMobile=false" +
//   "&lang=zh_CN" +
//   "&returnUrl=" +
//   "&fromSite=52" +
//   "&bizParams=" +
//   "&_bx-v=2.0.31";
