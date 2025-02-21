/**
 * Will contain the loaded factory
 * The factory will be initialized to an empty object
 * Will expose methods for IRPTU requests
 * - Method for adding an input
 * - Method for removing an input
 * The list of inputs will need to be bindable, or at-least a list of their IDs
 * - this will make them selectable outside of the module, 
 * Will have access to all the methods of the calculator module
 * - All the CORS on the factory object itself will be carried out in this module
 * - The loaded factory store will simply expose the methods listed above
 * Questions:
 * - How will the input item data be bound to the selector controls in the IRPTU request menus?
 * - How will the data of the loaded factory be bound to the FPC view?
 *      - Could just reload the view every time changes are made to the structure? This would work with the structure-passing I'm doing now
 * Alternatives/Improvements
 * - Ability to remove portions, or all of the IRPTU for any given item
 * - Storing inputs seperate from the loaded factory data object so they don't have to be parsed out every time they're required
 * - Could use cookies to maintain the loaded factory between sessions
 */