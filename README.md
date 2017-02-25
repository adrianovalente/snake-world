# Snake World Online

That's our custom multiplayer implementation of the famous [Snake Game](https://en.wikipedia.org/wiki/Snake_(video_game)).

## Getting Started

It's a web app built on Express using [socket.io](socket.io). All the game logic runs on server-side and the only frontend responsability is to catch user events and send it to the server.

## Prerequisites

Follow these instructions to have a copy of the project up and running on your local machine for development and testing purposes.

``` bash
npm install
npm start
```

## Maybe in the future...

There are still a lot of things to be done!

- Current implementation does not persist any data. All info (such as scores, user names and even snake positions) are stored in memory.
- We should find some way to scale the application if it's needed to add more machines (how to do it with socket connections?)
- It would be awesome to add some social network integration!
- The game is not mobile-friendly at all

# Contributing

Feel free to open [issues](https://github.com/adrianovalente/snake-world/issues), fork and submit [pull requests](https://github.com/adrianovalente/snake-world/pulls)!

# License

This project is licensed under the [MIT License](LICENSE.md).
