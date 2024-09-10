// import React from 'react';

// class Research extends React.Component {
//     // render(){
//     return (
//         <div>
//             <object aria-label="Research Page" type="text/html" data="/research/index.html" width="100%" height="100%" style={{overflow: 'auto', display: 'flex', flexDirection: 'column'}}></object>
//         </div>
//     );
//     // }
// }

// export default Research;

import React from 'react';

const ResearchPage = () => {
  return (
    <div>
      <iframe
        src="/research/index.html"
        title="Research Page"
        width="100%"
        height="1100px"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};

export default ResearchPage;
