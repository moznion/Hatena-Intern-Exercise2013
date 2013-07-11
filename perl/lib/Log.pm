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
    my $self = shift;
    my ($method) = $self->{req} =~ /(\S*)/;
    return $method;
}

sub path {
}

sub uri {
}

sub time {
}

1;
