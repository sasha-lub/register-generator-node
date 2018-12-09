export const register = ({ values }) => {
  return `// 
 #foreach($register in $registers)
    class ${values.register.name}_reg extends uvm_reg;
        \`uvm_object_utils( ${values.register.name}_reg )
    
    ${values.register.fields.map(field => {return 'kokoko' + field.name})}
  


    `;
};