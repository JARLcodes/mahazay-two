// import React, { Component } from 'react'
// 

// 

// export default class AddAvatar extends Component {
//   constructor(props){
//     super(props);
    
//   }

 



//   handleClick(e){
//     e.preventDefault();
//     console.log('clicked', e);
//   }

//   render() {
//     const { fileDownloadUrlValue } = this.state;
//     return (
//       <div style={{display: 'flex', flexDirection: 'column'}}>
//          <FormHelperText id="name-helper-text" style={{marginLeft: '25%', marginTop: '10%'}}>Add Profile Photo (optional)</FormHelperText>
//         <input style={{fontFamily:'Karla, sansSerif', marginLeft: '25%', marginTop: '5%'}} type="file" id="file"  onChange={this.onURLChange.bind(this)} onClick={this.handleClick.bind(this)}onKeyDown={this.onURLInputKeyDown.bind(this)}/>
//         { fileDownloadUrlValue && <img src={fileDownloadUrlValue} style={{marginLeft: '25%', marginTop: '5%'}}/>}
//       </div>
//     )
//   }
// }


