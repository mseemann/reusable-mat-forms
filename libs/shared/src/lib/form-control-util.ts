import { ControlValueAccessor, NgControl } from '@angular/forms';

export const appendFormControlInputOutputTransformerProxy = <INNER, OUTER>(
   ngControl: NgControl | undefined,
   transformIncommingValue: (inputValue: OUTER) => INNER,
   transformOutgoingValue: (outgoingValue: INNER) => OUTER
) => {
   if (!ngControl?.valueAccessor) {
      throw new Error('NgControl with valueAccessor is strongly needed to create a proxy');
   }
   ngControl.valueAccessor = new Proxy(ngControl.valueAccessor, {
      get(target: ControlValueAccessor, prop: keyof ControlValueAccessor, receiver) {
         if (prop === 'writeValue') {
            return (inputValue: OUTER) => {
               target.writeValue(transformIncommingValue(inputValue));
            };
         } else if (prop === 'registerOnChange') {
            return (fn: (value: OUTER) => void) => {
               const onChange = (value: INNER) => {
                  fn(transformOutgoingValue(value));
               };
               target.registerOnChange(onChange);
            };
         }
         return Reflect.get(target, prop, receiver);
      },
   });
};
