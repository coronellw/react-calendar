## How to run

Once you have downloaded this proyect, all you need to do is run `npm/yarn` install, once the dependencies are added, you can then run with `npm start` or `yarn start`

# Some used tools
```
"axios": "^0.18.0",
"enzyme": "^3.10.0",
"react-fontawesome": "^0.1.4",
"moment": "^2.24.0",
"react": "^16.9.0",
"react-color": "^2.17.3",
"react-dom": "^16.9.0",
"react-scripts": "3.1.1",
"styled-components": "^4.3.2"
```

# Other principles
* React Hooks
* Async calls

# What to improve/Known issues
* Some browser like chrome display a border in input boxes by default, this can be fixed through improving CSS rules.
* The use of Redux and useContext may reduce and improve the perfomance and make the code cleaner, did not implemented due to lack of time.
* Some test can improve once `hooks` get better support from jest team, would need to follow up.
* We could use tools like `sendGrid` to send email depneding on time of a certain reminder.
* Implementing some security to make the tool usable for a variety of purposes.
* Expand reminders through several days span.
* Adjust font with media queries to better display font-size according to screen width.