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
 - Title Screen Support?

4pac
----
 - Try to get better blending for adjacent walls
 - More consistent 'mouth' when pac is facing up or down

Clouds
------
 - Better styling of Game over button
   - Determine font height: http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas/7462767#7462767
 - Enemies fire bullets at player
   - Player hit == game over
 - Collision detection is too naive (see Engine/Collision above)
 - Push UFO update logic into the UFO (see Engine/AI above)