export const block = `

  ////////////////////////////////////////////////////////////////////
  // This code was generated automatically
  // tool is free can be found by link:
  // https://register-model-generator.herokuapp.com
  //
  // author: Liubchenko O.
  ////////////////////////////////////////////////////////////////////

#if($regModel.package)package $regModel.package;#end

import uvm_pkg::*;
\`include "uvm_macros.svh"

#foreach($register in $regModel.registers)

  //////////////////////////////////
  // REGISTER DECLARATION
  //////////////////////////////////

class $register.name extends uvm_reg;
    \`uvm_object_utils($register.name)
    #foreach($field in $register.fields)
    rand uvm_reg_field $field.name#if($field.dimension && $field.dimension > 1)[$field.dimension]#end;
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
                        .access                  ("$field.access"),
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
                        .access                  ("$field.access"),
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

  //////////////////////////////////
  // BLOCK DECLARATION
  //////////////////////////////////
class $block.name extends uvm_reg_block;
\`uvm_object_utils($block.name)

    #foreach($field in $block.regFields)
    rand $field.fieldType $field.name#if($field.dimension && $field.dimension > 1)[$field.dimension]#end;
    #end
    #foreach($field in $block.blockFields)
    rand $field.fieldType $field.name#if($field.dimension && $field.dimension > 1)[$field.dimension]#end;
    #end

    #if($block.mem.name)uvm_mem $block.mem.name;#end

    uvm_reg_map $block.map.name;

    function new(string name = "$block.name");
        super.new(.name(name), .has_coverage($block.coverageMode));
    endfunction: new

    virtual function void build();
    #foreach($field in $block.regFields)
        #if($field.dimension && $field.dimension > 1)
            for (int i = 0; i < $field.dimension; i++)
            begin
              $field.name[i] = $field.fieldType::type_id::create(\\$sformatf("$field.name%0h", i));
              `+'${field.name}[i]'+`.configure(.blk_parent(this));
              `+'${field.name}[i]'+`.build();
            end
        #else
          $field.name = $field.fieldType::type_id::create("$field.name");
          `+'${field.name}'+`.configure(.blk_parent(this));
          `+'${field.name}'+`.build();
        #end
    #end

    #foreach($field in $block.blockFields)
        #if($field.dimension && $field.dimension > 1)
            for (int i = 0; i < $field.dimension; i++)
            begin
          $field.name[i] = $field.fieldType::type_id::create(\\$sformatf("$field.name%0h", i));
          `+'${field.name}[i]'+`.configure(this);
          `+'${field.name}[i]'+`.build();
            end
        #else
          $field.name = $field.fieldType::type_id::create("$field.name");
          `+'${field.name}'+`.configure(this);
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
                                .endian($block.map.endian));
   default_map = $block.map.name;

   #foreach($field in $block.regFields)
   #if($field.dimension && $field.dimension > 1)
   for (int i = 0; i < $field.dimension; i++)
   begin
   `+'${block.map.name}'+`.add_reg(.rg($field.name[i]),
                             .offset(i * $field.offset),
                             .rights("$field.access"));
   end
   #else
     `+'${block.map.name}'+`.add_reg(.rg($field.name),
                             .offset($field.offset),
                             .rights("$field.access"));
   #end
   #end

   #foreach($field in $block.blockFields)
     `+'${block.map.name}'+`.add_submap(`+'${field.name}'+`.map, $field.offset);
   #end

   #if($block.mem.name)
   `+'${block.map.name}'+`.add_mem($block.mem.name, .offset($block.mem.offset));
   #end
        lock_model();
    endfunction: build

endclass: $block.name
#end

#if($regModel.additionalComponent.generateTransaction)

  //////////////////////////////////
  // This is TRANSACTION declaration
  //////////////////////////////////

    class `+'${regModel.name}'+`_transaction extends uvm_sequence_item;

      \`uvm_object_utils(`+'${regModel.name}'+`_transaction)

      rand bit cmd;
      rand int addr;
      rand int data;

      constraint c_addr { addr >= 0; addr < 256; }
      constraint c_data { data >= 0; data < 256; }

      function new (string name = "");
        super.new(name);
      endfunction

      function string convert2string;
        return \\$sformatf("cmd=%b, addr=%0d, data=%0d", cmd, addr, data);
      endfunction

      function void do_copy(uvm_object rhs);
        `+'${regModel.name}'+`_transaction tx;
        \\$cast(tx, rhs);
        cmd  = tx.cmd;
        addr = tx.addr;
        data = tx.data;
      endfunction

      function bit do_compare(uvm_object rhs, uvm_comparer comparer);
        `+'${regModel.name}'+`_transaction tx;
        bit status = 1;
        \\$cast(tx, rhs);
        status &= (cmd  == tx.cmd);
        status &= (addr == tx.addr);
        status &= (data == tx.data);
        return status;
      endfunction

    endclass: `+'${regModel.name}'+`_transaction

  //////////////////////////////////
  // This is SEQUENCER declaration
  //////////////////////////////////

typedef uvm_sequencer #(`+'${regModel.name}'+`_transaction) `+'${regModel.name}'+`_sequencer;

#end

#if($regModel.additionalComponent.generateAgent)
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

#if($regModel.additionalComponent.generateAdapter)

  //////////////////////////////////
  // This is ADAPTER stub
  //////////////////////////////////

class `+'${regModel.name}'+`_adapter extends uvm_reg_adapter;
   \`uvm_object_utils( `+'${regModel.name}'+`_adapter )
 
   function new( string name = "" );
      super.new( name );
   endfunction: new
 
   virtual function uvm_sequence_item reg2bus( const ref uvm_reg_bus_op rw );
      `+'${regModel.name}'+`_transaction tx;
      tx = `+'${regModel.name}'+`_transaction::type_id::create("tx");
      tx.cmd = (rw.kind == UVM_WRITE);
            tx.addr = rw.addr;
            if (tx.cmd)
              tx.data = rw.data;
            return tx;
   endfunction: reg2bus
 
   virtual function void bus2reg( uvm_sequence_item bus_item,
                                  ref uvm_reg_bus_op rw );

      `+'${regModel.name}'+`_transaction tx;
      assert( \\$cast(tx, bus_item) )
        else \`uvm_fatal("", "Exception occurred in `+'${regModel.name}'+`_adapter")

      if (tx.addr < 2)
      begin
        rw.kind = tx.cmd ? UVM_WRITE : UVM_READ;
        rw.addr = tx.addr;
        rw.data = tx.data;
        rw.status = UVM_IS_OK;
      end
      else
        rw.status = UVM_NOT_OK;
   endfunction: bus2reg
 
endclass: `+'${regModel.name}_adapter'+`

#end

#if($regModel.additionalComponent.generateSequence)

  //////////////////////////////////
  // This is SEQUENCE declaration
  //////////////////////////////////
      class `+'${regModel.name}'+`_reg_seq extends uvm_sequence;

        \`uvm_object_utils(`+'${regModel.name}'+`_reg_seq)

        function new (string name = "");
          super.new(name);
        endfunction

        `+'${regModel.name}'+`_reg_model regmodel;

        task body;
          uvm_status_e   status;
          uvm_reg_data_t incoming;

          if (starting_phase != null)
            starting_phase.raise_objection(this);

          regmodel.r0.write(status, .value(111), .parent(this));
          assert( status == UVM_IS_OK );

          regmodel.r1.write(status, .value(222), .parent(this));
          assert( status == UVM_IS_OK );

          regmodel.r0.read(status, .value(incoming), .parent(this));
          assert( status == UVM_IS_OK );
          assert( incoming == 111 )
            else \`uvm_warning("", \\$sformatf("incoming = %4h, expected = 111", incoming))

          regmodel.r1.read(status, .value(incoming), .parent(this));
          assert( status == UVM_IS_OK );
          assert( incoming == 222 )
            else \`uvm_warning("", \\$sformatf("incoming = %4h, expected = 222", incoming))

          if (starting_phase != null)
            starting_phase.drop_objection(this);
        endtask

      endclass

#end


#if($regModel.additionalComponent.generateDriver)

  //////////////////////////////////
  // This is DRIVER stub
  //////////////////////////////////

class `+'${regModel.name}'+`_driver extends uvm_driver #(`+'${regModel.name}'+`_transaction);

    \`uvm_component_utils(`+'${regModel.name}'+`_driver)

    virtual dut_if dut_vi;

    function new(string name, uvm_component parent);
      super.new(name, parent);
    endfunction

    function void build_phase(uvm_phase phase);
      if( !uvm_config_db #(virtual dut_if)::get(this, "", "dut_if", dut_vi) )
        \`uvm_error("", "uvm_config_db::get failed")
    endfunction

    task run_phase(uvm_phase phase);
      forever
      begin
        seq_item_port.get_next_item(req);
        dut_vi.en    <= 1;
        dut_vi.cmd   <= req.cmd;
        dut_vi.addr  <= req.addr;
        if (req.cmd)
          dut_vi.wdata <= req.data;

        @(posedge dut_vi.clock);
        dut_vi.en <= 0;

        if (req.cmd == 0)
        begin
          @(posedge dut_vi.clock);
          req.data = dut_vi.rdata;
        end

        seq_item_port.item_done();
      end
    endtask

  endclass: `+'${regModel.name}'+`_driver
#end


#if($regModel.additionalComponent.generateEnv)

  //////////////////////////////////
  // ENVIRONMENT DECLARATION
  //////////////////////////////////

    class `+'${regModel.name}'+`_env extends uvm_env;

      \`uvm_component_utils(`+'${regModel.name}_env'+`)

      `+'${regModel.name}'+`_reg_model  regmodel;
      `+'${regModel.name}'+`_adapter  m_adapter;

      `+'${regModel.name}'+`_sequencer m_seqr;
      `+'${regModel.name}'+`_driver    m_driv;

      function new(string name, uvm_component parent);
        super.new(name, parent);
      endfunction

      function void build_phase(uvm_phase phase);

        regmodel = `+'${regModel.name}'+`_reg_model::type_id::create("regmodel", this);
        regmodel.build();

        m_adapter = `+'${regModel.name}'+`_adapter::type_id::create("m_adapter",, get_full_name());

        m_seqr = `+'${regModel.name}'+`_sequencer::type_id::create("m_seqr", this);
        m_driv = `+'${regModel.name}'+`_driver   ::type_id::create("m_driv", this);
      endfunction

      function void connect_phase(uvm_phase phase);
        regmodel.default_map.set_sequencer( .sequencer(m_seqr), .adapter(m_adapter) );
        regmodel.default_map.set_base_addr(0);
        regmodel.add_hdl_path("top.dut1");

        m_driv.seq_item_port.connect( m_seqr.seq_item_export );
      endfunction

    endclass:`+'${regModel.name}'+`_env

#end

#if($regModel.additionalComponent.generateTest)

  //////////////////////////////////
  // This is TEST stub
  //////////////////////////////////

    class `+'${regModel.name}'+`_test extends uvm_test;
      \`uvm_component_utils(`+'${regModel.name}'+`_test)

      `+'${regModel.name}'+`_env m_env;

      function new(string name, uvm_component parent);
        super.new(name, parent);
      endfunction

      function void build_phase(uvm_phase phase);
        m_env = `+'${regModel.name}'+`_env::type_id::create("m_env", this);
      endfunction

      task run_phase(uvm_phase phase);
        `+'${regModel.name}'+`_reg_seq seq;
        seq = `+'${regModel.name}'+`_reg_seq::type_id::create("seq");
        if ( !seq.randomize() )
          \`uvm_error("", "Randomize failed")
        seq.regmodel = m_env.regmodel;
        seq.starting_phase = phase;
        seq.start( m_env.m_seqr );
      endtask

    endclass: `+'${regModel.name}'+`_test
#end

#if($regModel.package)endpackage: $regModel.package;#end

  //////////////////////////////////
  // This is TOP stub
  //////////////////////////////////

module top;

  import uvm_pkg::*;
  import $regModel.package::*;

  dut_if dut_if1 ();

  dut    dut1 ( .dif(dut_if1) );

  initial
  begin
    dut_if1.clock = 0;
    forever #5 dut_if1.clock = ~dut_if1.clock;
  end

  initial
  begin
    uvm_config_db #(virtual dut_if)::set(null, "*", "dut_if", dut_if1);

    uvm_top.finish_on_completion = 1;

    run_test("`+'${regModel.name}'+`_test");
  end

endmodule: top

`;