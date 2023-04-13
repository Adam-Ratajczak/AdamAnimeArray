# AdamAnimeArray

## How to run this?
1. Clone the repository
2. Install npm
3. Install go
4. Install mysql database
5. Create database for your animes
6. Write .env file with correct database connection string. It should look like that: 'user:password@(host:port)/database_name' and paste it inside folders 'go' and 'mal-scrapper'
7. To obtain database:
   1. Method 1: run scrapper inside 'mal-scrapper' directory
      1. run 'go get' to get all required packages
      2. For the first time, run script with uncommented 'loadSQLFile' functions. Otherwise, keep them commented in order not to overwrite your database
      3. Set constant 'MAX_CONCURRENT_JOBS' to at most 15 (more coroutines can cause denial of service issues)
      4. Set constant 'MODE' to zero (scrapping mode)
      5. Splitting anime scrapping process is recommended, try to run script several times but with less letters at one time
      6. After you scrapped everything you need, change 'MODE' to 1. You can also increase number of ongoing coroutines, my advice is to set it to 40
      7. Run script with all letters in the array to obtain anime relations
   2. Method 2: get ready database files from github webpage
      1. Execute all mal-scrapper/sql_files files in the following order:
         1. YeetTables.sql
         2. AnimeTables.sql
         3. UserTables.sql
         4. Last.sql
      2. Complete database of almost 6000 animes in 7 languages can be found in repo relases page
8. Run 'npm install' inside the root folder
9. Type 'go get' and then 'go run .' inside golang folder
10. Run 'npm run start' when your setup is ready
11. Enjoy your animes!!!

## Licensing:
"THE BEER-WARE LICENSE" (Revision 42):

<phk@FreeBSD.ORG> wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return Poul-Henning Kamp

## Contributing:
Feel free to share your opinion about this small project and how it can be improved ;-)