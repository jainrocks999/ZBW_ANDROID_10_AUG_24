import React, {useMemo, useState} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';

export default function Radio({onPress, id}) {
  const radioButtons = useMemo(
    () => [
      {
        id: '0', // acts as primary key, should be unique and non-empty string
        label: 'Proprietor',
        value: 'proprietor',
      },
      {
        id: '1',
        label: 'Staff',
        value: 'staff',
      },
    ],
    [],
  );

  return (
    <RadioGroup
      containerStyle={{flexDirection: 'row'}}
      labelStyle={{
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
      }}
      radioButtons={radioButtons}
      onPress={id => {
        onPress(id);
      }}
      selectedId={id}
    />
  );
}
