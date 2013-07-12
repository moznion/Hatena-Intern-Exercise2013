package Log;
use strict;
use warnings;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub protocol {
}

sub method {
}

sub path {
}

sub uri {
}

sub time {
}

sub to_hash {
    my $self = shift;
    exit(1); # FIXME implement me!
}
1;
