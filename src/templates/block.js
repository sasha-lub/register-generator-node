export const block = `

#if($regModel.package)package $regModel.package;#end

import uvm_pkg::*;
\`include "uvm_macros.svh"

#foreach($register in $regModel.registers)

//////////// register class declaration ////////////

class $register.name extends uvm_reg;
    \`uvm_object_utils($register.name)

    #foreach($field in $register.fields)
    #if($field.isRand == "1")rand#end uvm_reg_field $field.name#if($field.amount && $field.amount > 1)[$field.amount]#end ;
    #end

    function new(string name = "$register.name");
        super.new(.name(name),
           .n_bits($register.size),
           .has_coverage($register.coverageMode));
    endfunction: new

    virtual function void build();

        #foreach($field in $register.fields)
        #if($field.amount && $field.amount > 1)
        for(int i = 0; i < $field.amount; i++)
        begin
            $field.name[i] = uvm_reg_field::type_id::create(\\$sformatf("$field.name%0h", i));
            `+'${field.name}[i]'+`.configure(
                        .parent                  (this),
                        .size                    ($field.size),
                        .lsb_pos                 ($field.lsbPos),
                        .access                  ("$field.access")),
                        .volatile                ($field.volatile),
                        .reset                   ($field.reset),
                        .has_reset               ($field.hasReset),
                        .is_rand                 ($field.isRand),
                        .individually_accessible ($field.individuallyAccessible));
        end
        #else
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
        #end
    endfunction: build
endclass: $register.name
#end

#foreach($block in $regModel.blocks)

//////////////// block class declaration //////////////

class $block.name extends uvm_reg_block;
\`uvm_object_utils($block.name)

    #foreach($field in $block.fields)
    rand $field.type $field.name#if($field.amount && $field.amount > 1)[$field.amount]#end;
    #end

    #if($block.mem.name)uvm_mem $block.mem.name;#end

    uvm_reg_map $block.map.name;

    function new(string name = "$block.name");
        super.new(.name(name), .has_coverage($block.coverageMode));
    endfunction: new

    virtual function void build();

        #foreach($field in $block.fields)

          #if($field.amount && $field.amount > 1)

            for (int i = 0; i < $field.amount; i++)
            begin
              $field.name[i] = $field.type::type_id::create(\\$sformatf("$field.name%0h", i));
              `+'${field.name}[i]'+`.configure(.blk_parent(this));
              `+'${field.name}[i]'+`.build();
            end

          #else

            $field.name = $field.type::type_id::create("$field.name");
            `+'${field.name}'+`.configure(.blk_parent(this));
            `+'${field.name}'+`.build();

          #end
        #end

        #if($block.mem.name)

        $block.mem.name = new("$block.mem.name", $block.mem.offset, $block.mem.size);
        `+'${block.mem.name}'+`.add_hdl_path_slice("$block.mem.name", 0, $block.mem.size);
        `+'${block.mem.name}'+`.configure(.parent(this));
        #end

        $block.map.name = create_map(.name("$block.map.name"),
                                     .base_addr($block.map.offset),
                                     .n_bytes($block.map.size),
                                     .endian($block.map.endian);
        default_map = $block.map.name;

        #foreach($field in $block.fields)
        #if($field.amount && $field.amount > 1)
        for (int i = 0; i < $field.amount; i++)
        begin
        `+'${block.map.name}'+`.add_reg(.rg($field.name[i]),
                                  .offset(i), // todo: field offset
                                  .rights($field.access));
        end
        #else
          `+'${block.map.name}'+`.add_reg(.rg($field.name),
                                    .offset($field.offset),
                                    .rights($field.access));
        #end
        #end
        #if($block.mem.name)
        `+'${block.map.name}'+`.add_mem($block.mem.name, .offset($block.mem.offset)));
        #end

        lock_model();
    endfunction: build

endclass: $block.name
#end
`;