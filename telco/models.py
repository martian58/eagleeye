from django.db import models

# Create your models here.

class Node(models.Model):
    name = models.CharField(max_length=100)
    ip_address = models.GenericIPAddressField()
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Connection(models.Model):
    source = models.ForeignKey(Node, related_name='source_connections', on_delete=models.CASCADE)
    target = models.ForeignKey(Node, related_name='target_connections', on_delete=models.CASCADE)
    status = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.source.name} -> {self.target.name}"

class Alarm(models.Model):
    node = models.ForeignKey(Node, on_delete=models.CASCADE)
    alarm_type = models.CharField(max_length=100)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Alarm on {self.node.name} - {self.alarm_type}"

class Fault(models.Model):
    node = models.ForeignKey(Node, on_delete=models.CASCADE)
    fault_type = models.CharField(max_length=100)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Fault on {self.node.name} - {self.fault_type}"
