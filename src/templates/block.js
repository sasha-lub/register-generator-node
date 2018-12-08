export const register = ({ values }) => {
  return `// 

class ($block.name) extends uvm_reg_block;
   \`uvm_object_utils( ($block.name) )

    #foreach($register in $registers)
        rand ($register.className) ($register.name);
    #end

    uvm_reg_map reg_map;

    function new( string name = "($block.name)" );
       super.new( .name( name ), .has_coverage( ($block.coverageMode) ) );
    endfunction: new

    virtual function void build();

        #foreach($register in $registers)
            ($register.name) = ($register.className)::type_id::create("($register.name)" );
            ($register.name).configure( .blk_parent( this ) ); <-----
            ($register.name).build();
        #end

        reg_map = create_map( .name( "reg_map" ), .base_addr( 8'h00 ),
                              .n_bytes( 1 ), .endian(UVM_LITTLE_ENDIAN);

        #foreach($register in $registers)
            reg_map.add_reg( .rg( jb_recipe_reg ), .offset( 8'h00 ),    .rights( "WO" ) );
        #end

        lock_model();
    endfunction: build

endclass: ($block.name)


    `;
};