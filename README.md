# TODO-App
A simple showcase of basic HTML, CSS and JS Interactions

1. Enter your task
2. Add task to list
3. Complete to cross out task
4. Click 'x' to remove task
5. Tasks should be stored upon reload of page


# ChangeLog init:
1. Proper declaration of tasks array variable
2. Added unique text identifier to task property to account for user adding identical task textInputs
3. Improved event listener delegation
4. Removed duplicate task rendering, separated using addTask function
5. Separated completion and removal button handling for easier code reading

# ChangeLog 2023-12-06 jQuery Refactor:
- branched to a jQuery version
- refactored and simplified blocks of code
- fixed event listener outside of render function
- replaced time coding for task to uniqueID