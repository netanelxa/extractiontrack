class Tamplates {
   static navbar(links) {
         return ` 
         <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
         <a class="navbar-brand" href="#">Shift </a>
         <button  class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarSupportedContent">
           <ul class="navbar-nav mr-auto">
           ${links.map((link) => {
              return Tamplates.navbarLink(link)
           })}
         </div>
       </nav>
         `
     }

     static navbarLink({path, content}) {
       return `
       <li class="nav-item active">
       <a class="nav-link" href="${path}">${content}<span class="sr-only">(current)</span></a>
       </li>
       `
     } 
}


class TamplateService {
    setNavbar(body) {
        
    }


    setLinks() {
    }
}