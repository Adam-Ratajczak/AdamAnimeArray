export default function redirect(nextURL){
    const nextTitle = 'Redirection';
    const nextState = { additionalInformation: 'Redirected to: ' + nextURL };
    
    // This will replace the current entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL);
  
    window.location.reload();
}