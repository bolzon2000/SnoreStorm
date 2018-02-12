import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


var radio_props = [
  {label: 'param1', value: 0 },
  {label: 'param2', value: 1 }
];

var RadioButtonProject = React.createClass({
  getInitialState: function() {
    return {
      value: 0,
    }
  },
  render: function() {
    return (
      <View>
        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {this.setState({value:value})}}
        />
      </View>
    );
  }
});
