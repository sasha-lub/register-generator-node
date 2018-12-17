export const block = `
#if($regModel.package)package $regModel.package;#end

import uvm_pkg::*;
\`include "uvm_macros.svh"

#foreach($register in $regModel.registers)
class $register.name extends uvm_reg;
\`uvm_object_utils( $register.name )

    #foreach($field in $register.fields)
        #if($field.isRand == "1")rand#end uvm_reg_field $field.name;
    #end

function new( string name = "$register.name" );
super.new( .name(name),
           .n_bits($register.size),
           .has_coverage($register.coverageMode));
endfunction: new

virtual function void build();
    #foreach($field in $register.fields)
        $field.name = uvm_reg_field::type_id::create("$field.name");
        `+'${field.name}'+`.configure(
    .parent                  (this),
    .size                    ($field.size),
    .lsb_pos                 ($field.lsbPos),
    .access                  ("$field.access")),
    .volatile                ($field.volatile),
    .reset                   ($field.reset),
    .has_reset               ($field.hasReset),
    .is_rand                 ($field.isRand),
    .individually_accessible ($field.individuallyAccessible));
    #end
endfunction: build
endclass: $register.name
#end

#foreach($block in $regModel.blocks)

class $block.name extends uvm_reg_block;
\`uvm_object_utils( $block.name )

    #foreach($field in $block.fields)
    rand $field.type $field.name;
    #end

#if($block.mem.name)uvm_mem $block.mem.name;#end

uvm_reg_map $block.map.name;

function new( string name = "$block.name" );
    super.new( .name( name ), .has_coverage( $block.coverageMode ) );
endfunction: new

virtual function void build();

    #foreach($field in $block.fields)
        $field.name = $field.type::type_id::create("$field.name" );
        `+'${register.name}'+`.configure( .blk_parent( this ) );
        `+'${register.name}'+`.build();
    #end
    
    #if($block.mem.name)
    $block.mem.name = new("$block.mem.name", $block.mem.offset, $block.mem.size);
    `+'${block.mem.name}'+`.add_hdl_path_slice("$block.mem.name", 0, $block.mem.size);
    `+'${block.mem.name}'+`.configure( .parent(this) );
    #end
    
    $block.map.name = create_map( .name( "$block.map.name" ),
                                  .base_addr( $block.map.offset ),
                                  .n_bytes( $block.map.size ),
                                  .endian( $block.map.endian );
    default_map = $block.map.name;

    #foreach($field in $block.fields)
        `+'${block.map.name}'+`.add_reg( .rg( $field.name ),
                                  .offset( $field.offset ),
                                  .rights( $field.access ) );
    #end
    
    #if($block.mem.name)
    `+'${block.map.name}'+`.add_mem($block.mem.name, .offset($block.mem.offset)));
    #end

lock_model();
endfunction: build

endclass: $block.name
#end
`;