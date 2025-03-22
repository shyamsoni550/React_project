 function customrender(reactelement, container) {
     // const domelement = document.createElement(reactelement.type);
     // domelement.textContent = reactelement.children; // Use textContent instead of innerHTML
     // domelement.setAttribute('href', reactelement.props.href); // Use setAttribute with correct syntax
     // domelement.setAttribute('target', reactelement.props.target); // Use setAttribute with correct syntax
     // container.appendChild(domelement); // Append the created element to the container
     // container.appendchild(domelement)

       const domElement = document.createElement(reactElement.type);
       domElement.innerHTML=reactElement.children
       for (const prop in reactElement.props) {
        if (prop=== 'children ') continue; {
            domElement.setAttribute(prop,reactElement.props[prop])
        }
        container.appendChild(domElement)
       }
 }
 
 const reactElement = {
     type: 'a',
     props: {
         href: 'https://google.com',
         target: '_blank'
     },
     children: 'Click me to visit google'
 };
 
 const maincontainer = document.getElementById('root'); // Correctly select the container
 customrender(reactElement, maincontainer); // Call the customrender function to render the element
 