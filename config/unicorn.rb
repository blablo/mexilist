worker_processes 3
working_directory "/home/ubuntu/mexilist/"

# This loads the application in the master process before forking
# worker processes
# Read more about it here:
# http://unicorn.bogomips.org/Unicorn/Configurator.html
preload_app true

timeout 60

# This is where we specify the socket.
# We will point the upstream Nginx module to this socket later on
listen "/home/ubuntu/mexilist/tmp/sockets/unicorn.sock", :backlog => 64

pid "/home/ubuntu/mexilist/tmp/pids/unicorn.pid"

# Set the path of the log files inside the log folder of the testapp
stderr_path "/home/ubuntu/mexilist/log/unicorn.stderr.log"
stdout_path "/home/ubuntu/mexilist/log/unicorn.stdout.log"

before_fork do |server, worker|
# This option works in together with preload_app true setting
# What is does is prevent the master process from holding
# the database connection
  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.connection.disconnect!
end

after_fork do |server, worker|
# Here we are establishing the connection after forking worker
# processes
  defined?(ActiveRecord::Base) and
    ActiveRecord::Base.establish_connection
end
