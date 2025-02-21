<!--
Will need a method for loading a factory into the view
 - can be called by a lifecycle hook
Will need to update various things whenever a factory is loaded
 - menus will need to be refreshed
 - local lists of items, such as a local list of input items, will need to be refreshed
 - the actual components representing the nodes of the factory will need to be refreshed
Will need a method for reloading a factory
 - could just re-use the loading method, but it could lend to efficiency and understandibility if I seperate the two 

-->

<!--

LoadFactory()
ReloadFactory()

RefreshNodes()
RefreshMenus()
RefreshInputs()

-->