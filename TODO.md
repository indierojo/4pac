Engine
------
 - Better collision detection
   - change spaceship to inherit triangle, get better bounds for triangle
   - circle should not collide on square corners
   - Both of the above should be covered with tests.
 - Extract out common behaviors to interfaces
   - Initialization strategy (draw all glyphs)
   - Keyboard Handling should be an Interface with a few strategies / bindings to glyphs
     - IE: Attach the WASD movement handler to the player
   - Score display
   - Win / Lose / Restart
   - AI via strategy (IE: UFO has a movement strategy passed in, attach strategy passed in)
   - 'Wall' setup - can be shared across 4pac and snake
 - Title Screen Support?
 - Create 'rectangle' base similar to circle. Wall should extend 'rectangle' instead of defining it.

4pac
----
 - Try to get better blending for adjacent walls
 - More consistent 'mouth' when pac is facing up or down

Clouds
------
 - Better styling of Game over button
   - Determine font height: http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas/7462767#7462767
 - Collision detection is too naive (see Engine/Collision above)
 - Push UFO update logic into the UFO (see Engine/AI above)
 - Push bullet logic into a behavior.

Snake
-----
 - Need to change the model of the snake, I think ignoring the body other than the head would be wise, think of the body segments as static walls, keeping track of them in an queue and popping off the tail to remove it.
 - Figure out how to manage snake 'speed'