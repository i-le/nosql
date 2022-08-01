#Your code goes here
import 'org.apache.hadoop.hbase.client.HTable'
import 'org.apache.hadoop.hbase.client.Put'

def jbytes( *args )
    args.map { |arg| arg.to_s.to_java_bytes }
end

def put_many( table_name, row, column_values )
table = HTable.new(@hbase.configuration, table_name)
p = Put.new( *jbytes(row))
column_values.each do |k, v|
(column_family, column_qualifier)= k.split(':')
column_qulifier ||=""
p.add(*jbytes(column_family,column_qualifier, v))
end
    table.put(p)
end



put_many 'wiki', 'Title', {
"text:" => "Make up some article text",
"revision:author"=>"szhen6",
"revision:comment"=>"insert some comment"
}

get 'wiki', 'Title'


#Do not remove the exit call below
exit
