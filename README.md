# Smarkets - Take Home Test
This is my version of the application that was asked to be created as part of the smarkets take home test.

It makes use of the smarkets API to retrieve data on popular events and displays them in a minimalistic design.

The popular events will be displayed after a short loading screen.

Clicking on a popular event will open up an event summary, with basic information regarding to its status and type.

The timers are not static, so as time passes they should dynamically update.

## Installation and Building
First of all navigate to the smarkets-tht directory using:

`cd smarkets-tht`

Next install the dependancies using yarn:

`yarn`

To build and run the application type the following in the same directory:

`yarn start`

## Comments
Given more time, the solution could be improved in many ways.

For example, although work has gone into making it as accessible as possible with the inclusion of svg tags and responsive sizing, there are still many areas where it could be improved upon. One such improvement would be the introduction of colorblind customization. Currently, the application uses green and red hues to indicate at a glance event statuses, however ideally the user would be able to customize these to suite.

Additionally, the introduction of a store like redux would make expanding the application easier.
Although the management of props and callback functions in an application of this size is manageable, if it would to be expanded upon then in this aspect it could begin to become unwieldy. Additionally, due to its nature, redux would offer improved safety in regards to state errors.

Lastly, the application itself is very basic, and although functional, it doesn't offer much benefit to the user.
It would be nice to be able to add more to the event details display, such as event stats like referee decisions, possibly even in chronological order with the implementation of a timeline component -> which if designed correctly could act as a nice visual summary of the event.

Note:
I have noticed that sometimes it takes a while to load initially, this could be inefficient code in the data retrieval stage, although it seems to be in sync with cors-anywhere going down so this might not be the case. This would still be worth looking into.