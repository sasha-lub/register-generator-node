export const block = `

#if($regModel.package)package $regModel.package;#end

import uvm_pkg::*;
\`include "uvm_macros.svh"

#foreach($register in $regModel.registers)

//////////// register class declaration ////////////

class $register.name extends uvm_reg;
    \`uvm_object_utils($register.name)

    #foreach($field in $register.fields)
    rand uvm_reg_field $field.name#if($field.dimension && $field.dimension > 1)[$field.dimension]#end ;
    #end

    function new(string name = "$register.name");
        super.new(.name(name),
           .n_bits($register.size),
           .has_coverage($register.coverageMode));
    endfunction: new

    virtual function void build();

        #foreach($field in $register.fields)
        #if($field.dimension && $field.dimension > 1)
        for(int i = 0; i < $field.dimension; i++)
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
    rand $field.type $field.name#if($field.dimension && $field.dimension > 1)[$field.dimension]#end;
    #end

    #if($block.mem.name)uvm_mem $block.mem.name;#end

    uvm_reg_map $block.map.name;

    function new(string name = "$block.name");
        super.new(.name(name), .has_coverage($block.coverageMode));
    endfunction: new

    virtual function void build();

        #foreach($field in $block.fields)

          #if($field.dimension && $field.dimension > 1)

            for (int i = 0; i < $field.dimension; i++)
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
        #if($field.dimension && $field.dimension > 1)
        for (int i = 0; i < $field.dimension; i++)
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

#if($regModel.generateAgent)
  //////////////////////////////////
  // This is AGENT stub
  //////////////////////////////////

class `+'${regModel.name}_agent'+` extends uvm_agent;
   \`uvm_component_utils( `+'${regModel.name}_agent'+` )
 
   function new( string name, uvm_component parent );
      super.new( name, parent );
   endfunction: new
 
   function void build_phase( uvm_phase phase );
      super.build_phase( phase );

   endfunction: build_phase
 
   function void connect_phase( uvm_phase phase );

   endfunction: connect_phase
endclass: `+'${regModel.name}_agent'+`
#end

#if($regModel.generateAdapter)

  //////////////////////////////////
  // This is ADAPTER stub
  //////////////////////////////////

class `+'${regModel.name}_adapter'+` extends uvm_reg_adapter;
   \`uvm_object_utils( `+'${regModel.name}_adapter'+` )
 
   function new( string name = "" );
      super.new( name );
      supports_byte_enable = 0;
      provides_responses   = 0;
   endfunction: new
 
   virtual function uvm_sequence_item reg2bus( const ref uvm_reg_bus_op rw );

   endfunction: reg2bus
 
   virtual function void bus2reg( uvm_sequence_item bus_item,
                                  ref uvm_reg_bus_op rw );

   endfunction: bus2reg
 
endclass: `+'${regModel.name}_adapter'+`

#end

#if($regModel.generateEnv)

  //////////////////////////////////
  // This is ENV stub
  //////////////////////////////////
  
  class `+'${regModel.name}_env'+` extends uvm_env;
    \`uvm_component_utils(`+'${regModel.name}_env'+`)
 
    
  endclass: `+'${regModel.name}_env'+`
#end

#if($regModel.generateSequence)

  //////////////////////////////////
  // This is SEQUENCE stub
  //////////////////////////////////

  class `+'${regModel.name}_sequence'+` extends uvm_sequence;
    \`uvm_object_utils(`+'${regModel.name}_sequence'+`)


    
  endclass `+'${regModel.name}_sequence'+`
#end

#if($regModel.generateDriver)

  //////////////////////////////////
  // This is DRIVER stub
  //////////////////////////////////


#end

`;