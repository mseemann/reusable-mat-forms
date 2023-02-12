import { ControlValueAccessor, NgControl } from '@angular/forms';

export const appendFormControlInputOutputTransformerProxy = <IN, OUT>(
   ngControl: NgControl | undefined,
   transformIncommingValue: (inputValue: OUT) => IN,
   transformOutgoingValue: (outgoingValue: IN) => OUT
) => {
   if (!ngControl?.valueAccessor) {
      throw new Error('NgControl with valueAccessor is strongly needed to create a proxy');
   }
   ngControl.valueAccessor = new Proxy(ngControl.valueAccessor, {
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
