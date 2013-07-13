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
    return $self->_parse_request->{protocol};
}

sub method {
    my $self = shift;
    return $self->_parse_request->{method};
}

sub path {
    my $self = shift;
    return $self->_parse_request->{path};
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
    my $hash = +{
        'status'  => $self->{status},
        'time'    => $self->time(),
        'size'    => $self->{size},
        'uri'     => $self->uri(),
        'user'    => $self->{user},
        'method'  => $self->method(),
        'referer' => $self->{referer}
    };
    for my $field (keys %$hash) {
        delete $hash->{$field} unless $hash->{$field};
    }
    return $hash;
}

sub _parse_request {
    my ($self, $request) = @_;
    my ($method, $path, $protocol) = $self->{req} =~ m!^(\S*)\s(/\S*)\s(\S*)$!;
    return +{
        method   => $method,
        path     => $path,
        protocol => $protocol,
    };
}
1;
