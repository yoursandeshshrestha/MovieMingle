/* -----------------------------------*\
  #CUSTOM PROPERTY
\*-----------------------------------*/

:root{
  --background: rgb(0, 0, 0);
  --font-color-gray: #DDDCDF;
  --white-alpha-20: hsla(0, 0%, 100%, 0.2);
  --on-background: hsla(220, 100%, 95%, 1);

  /* Font */
  --font-roboto: "Roboto", sans-serif;
  --font-poppins: "Poppins", sans-serif;
}

/*-----------------------------------*\
  #RESET
\*-----------------------------------*/

*{
  padding: 0;
  box-sizing: border-box;
  margin: 0;
}

a{
  text-decoration: none;
}

li{
  list-style: none;
}

html, body{
  font-family: var(--font-poppins);
  background: var(--background);
  color: var(--font-color-gray);
}

img{
  color: white;
}

a{
  color: var(--font-color-gray);
  transition: 0.3s ease;
}

a:hover{
  transform: translateY(5px);
}

/*-----------------------------------*\
  #REUSED STYLE
\*-----------------------------------*/

.container{
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}