export const register = ({ values }) => {
  return `// 
 #foreach($register in $registers)
    class ${values.register.name}_reg extends uvm_reg;
        \`uvm_object_utils( ${values.register.name}_reg )

    #foreach($field in $registerFields)
    #if($field.isRand) rand #end  uvm_reg_field ($field.name);
    #end

    function new( string name = "($register.name)" );
    super.new( .name(name), .n_bits(($register.size)), .has_coverage(($register.coverageMode)));
    endfunction: new

    virtual function void build();
    #foreach($field in $register.fields)
    ($field.name) = uvm_reg_field::type_id::create("($field.name)");
    ($field.name).configure(
        .parent                  (this),
.size                    (($field.size)),
.lsb_pos                 (($field.lsbPos)),
.access                  ("($field.access)")),
.volatile                (($field.volatile)),
.reset                   (($field.reset)),
.has_reset               (($field.hasReset)),
.is_rand                 (($field.isRand)),
.individually_accessible (($field.individuallyAccessible)));
#end
endfunction: build
endclass: ($register.name)
#end


    `;
};