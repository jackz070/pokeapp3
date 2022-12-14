<h1>PokeApp 3.0</h1>
<hr><p>Expanded Pokedex app designed and created for learning purpose</p><h2>General Information</h2>
<hr><ul>
<li>PokeApp 3.0 is a Pokedex app serving data from PokeAPI created with HTML, React, Tailwind, React-Query and a number of smaller libraries </li>
</ul><ul>
<li>It's a practice project meant to serve widely-available information in an interesting, consistent way.</li>
</ul><ul>
<li>Learning and practicing usage of HTML, React, Tailwind, React-Query. Big challenges included fetching large amounts of data in an efficient way, handling deeply-nested and filled with reference urls responses from PokeAPI, debugging issues coming from React, third-party libraries and those specific to environment (iOS).</li>
</ul><ul>
<li>The process of creating this app was very enjoyable. It's work in progress, but all the refactors, bugs, read threads on Stack Overflow and realizations of dead-ends made it a great experience.</li>
</ul><h2>Technologies Used</h2>
<hr><ul>
<li>HTML</li>
</ul><ul>
<li>CSS</li>
</ul><ul>
<li>JavaScript</li>
</ul><ul>
<li>React</li>
</ul><ul>
<li>React-query</li>
</ul><ul>
<li>Auth0</li>
</ul><ul>
<li>Vite</li>
</ul><h2>Features</h2>
<hr><ul>
<li>Fetching and caching data from PokeAPI with react-query (which I love btw)</li>
</ul><ul>
<li>Very cute dark mode switch I've built myself with awesome icons referenced below. Also cool gradient backgrounds for Pokemon (colored based on types!)</li>
</ul><ul>
<li>Ability to authenticate with Google using Auth0 and change profile picture to select custom images & backgrounds. This functionality is a mock-up in a sense that there is no backend, no accounts are created, users are not kept track of at all.</li>
</ul><ul>
<li>Ability to mark Pokemon as caught, check that list and type distribution visualised with a pie-chart. Normally this functionality would be available for users who log in only, but as I have no backend here to store data for users it's available publicly and persisted only via local storage.</li>
</ul><ul>
<li>Acknowledging bug: Pokemon search functionality doesn't work on iOS and I have no idea on how to fix it.</li>
</ul><h2>Project Status: In Progress</h2>
<h2>Live Version:</h2> <p><a href="https://radiant-choux-0a80ea.netlify.app/">https://radiant-choux-0a80ea.netlify.app/</a></p><h2>To Be Done</h2>
<hr><ul>
<li>I would like to re-implement basic data fetching, management, sorting and filtering - with those features available in two different areas of the app with slightly differently structured data there is a lot of repetition, props passed only for the components to work and general spaghetti</li>
</ul><ul>
<li>Further code clean-up - there is some repetition that doesn't make code any more readable thus worth fixing, some unused imports and props probably</li>
</ul><ul>
<li>Performance optimizations, considered lazy loading in some places and Suspend, but need to do metering first</li>
</ul><ul>
<li>Understanding and fixing a funny bug with seeded random number generator used for Pokemon of the Day on 12/12/2022 (with other days supplied as seed it functioned well, with this - not so much)</li>
</ul><h2>Acknowledgements</h2>
<hr><ul>
<li>Thanks to the PokeAPI - my favourite (and challenging) free Public API!</li>
</ul><ul>
<li>Used the awesome <a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons"> Pokemon icons created by Roundicons Freebies - Flaticon</a></li>
</ul><h2>Contact</h2>
<hr><p><span style="margin-right: 30px;"></span><a href="https://www.linkedin.com/in/jacek-smoter-232a3424a/"><img target="_blank" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" style="width: 10%;"></a><span style="margin-right: 30px;"></span><a href="https://github.com/jackz070"><img target="_blank" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" style="width: 10%;"></a></p>
