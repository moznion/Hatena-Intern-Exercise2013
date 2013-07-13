package Log;
use strict;
use warnings;
use POSIX ();

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
    my ($method) = $self->{req} =~ /^(\S*)/;
    return $method;
}

sub path {
    my $self = shift;
    my ($path) = $self->{req} =~ m!\s(/\S*)!;
    return $path;
}

sub uri {
    my $self = shift;
    return 'http://' . $self->{host} . $self->path;
}

sub time {
    my $self = shift;
    my $time = $self->{epoch};
    return POSIX::strftime('%FT%T', gmtime($time));
}

sub to_hash {
    my $self = shift;
    exit(1); # FIXME implement me!
}
1;
