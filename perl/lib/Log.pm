package Log;
use strict;
use warnings;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub protocol {
    my $self = shift;
    my ($protocol) = $self->{req} =~ /(\S*)$/;
    return $protocol;
}

sub method {
    my $self = shift;
    my ($method) = $self->{req} =~ /(\S*)/;
    return $method;
}

sub path {
    my $self = shift;
    my ($path) = $self->{req} =~ m!\s(/\S*)!;
    return $path;
}

sub uri {
}

sub time {
}
1;
