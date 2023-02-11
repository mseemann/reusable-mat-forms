import { ControlValueAccessor } from '@angular/forms';

export const createFormControlInputOutputTransformerProxy = <IN, OUT>(
   valueAccessor: ControlValueAccessor,
   transformIncommingValue: (inputValue: OUT) => IN,
   transformOutgoingValue: (value: IN) => OUT
) => {
   return new Proxy(valueAccessor, {
      get(target: ControlValueAccessor, prop: keyof ControlValueAccessor, receiver) {
         if (prop === 'writeValue') {
            return (inputValue: OUT) => {
               target.writeValue(transformIncommingValue(inputValue));
            };
         } else if (prop === 'registerOnChange') {
            return (fn: (value: OUT) => void) => {
               const onChange = (value: IN) => {
                  fn(transformOutgoingValue(value));
               };
               target.registerOnChange(onChange);
            };
         }
         return Reflect.get(target, prop, receiver);
      },
   });
};
