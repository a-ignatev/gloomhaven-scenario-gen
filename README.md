# Summary

This is a simple app to generate GH B&B random scenario on yoru mobile screen to use it together with the physical components of the game.

This is just a POC, the code is messy.

The generation is extremely basic:
- Enemy placement is random
- Enemies a chosen based on some primitive scenario level logic
- Obstacle/trap generation is minimal (I haven’t added any special trap logic yet)
- I didn’t use any original game art — just in case
- I haven’t tested if the scenarios are actually playable or balanced — it’s more of a visual experiment for now
- I know that randomly generated scenarios are never going to as good as manually crafted for the game

How to use:
- Navigate to https://gh-scenario-gen.netlify.app/ using your phone (no ads, no tracking, free)
- Pick your settings – choose difficulty level and map size
- Hit "Start Game"
- Press "New" to generate another scenario
- While in setup mode, you can manually adjust obstacles and traps
- When you hide setup, only the scenario map remains on screen — no player and enemy spawn places

# Screenshot
![Current File](/resources/screenshot.png "Demo")

# Development:
It uses React + Vite. No special libs. All assests are just images. Rendering is done using plain `svg` elements.

```
npm run dev
```

## License

This project is licensed under the [CC BY-NC 4.0 License](https://creativecommons.org/licenses/by-nc/4.0/).  
You are free to use, modify, and share this project for non-commercial purposes, as long as you credit the original author.
