import React from 'react';
import CostumeCreate from './Costume-Create';

class CostumeItem extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        submitText: 'Update',
        formState: 'inactive',
        submitState: 'hidden'
      }
    }

    render() {
      return (
        <div className="costume-item">
          <header id="costumeHeader">
            <CostumeCreate handler={this.props.handleUpdate} 
             handleDelete={this.props.handleDelete}
             costume={this.props.costume} 
             submitText={this.state.submitText}
             formState={this.state.formState}
             submitState={this.state.submitState}
            />
          </header>
        </div>
      )
    }
}

export default CostumeItem;