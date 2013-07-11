package Log;
use strict;
use warnings;
use POSIX qw/strftime setlocale LC_TIME/;

BEGIN {
    $ENV{'TZ'} = 'GMT-0'; # XXX IT IS NOT JST!
}

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
    return strftime('%FT%T', localtime($time));
}
1;
