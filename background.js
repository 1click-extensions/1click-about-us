chrome.runtime.setUninstallURL("https://1ce.org");

if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}


chrome.runtime.onMessage.addListener(function (data, sender, callback) {
  //console.log(data)
  if("save link" == data.action){
    aja()
      .method('post')
      .url('https://utils.1ce.org/suggest-about-us')
      .cache(false)
      .body(data)
      .go();
  }
});


chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript(tab.id,{file:'js/findAbout.js'});
});
