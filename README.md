Olaf
==================

This is a simple mobile game built in JS.

## About

Olaf is a fisherman that needs to reach the hole in the ice in order to do some fishing.
The problem is that ice is fragiled and Olaf needs to find the correct way.
Olaf will walk in certain direction and ice will crack if direction is bad.

## User

Depending on ice fragility a user will be able to react in time and redirect Olaf. 
Olaf walks the same speed since he is caring fish nets and sticks. User can only direct him or stay still.

## Difficulty

Difficulty is measured in goal distance (auto generated) and ice plates fragility.
There are 4 levels of ice plates (fixed size) fragility:
* small - Olaf will sink if he continues till the end of the plate. He can escape in back or staying still.
* medium - Olaf will sink if he continues till the middle of the plate. He can escape in back or staying still.
* large - Olaf will sink if he spends more than 3 seconds on the spot. He must escape by going back.
* grand - Olaf will sink imediately when he steps into it. User can recognize it by light blue color.

## Motivation

We keep best scores online :)
Scores are calculated by time of arrival. More quicker, higher score.